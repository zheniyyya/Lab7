import { useLayoutEffect } from 'react';

function isInViewport(rect) {
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

function measure(bios) {
  const hasMore = bios.map((bio) => bio.scrollHeight > bio.clientHeight + 1);
  bios.forEach((bio, i) => {
    bio.closest('.tutor-card').toggleAttribute('data-has-more', hasMore[i]);
  });
}

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const bios = [...container.querySelectorAll('.tutor-card__bio')];
    measure(bios.filter((bio) => isInViewport(bio.getBoundingClientRect())));

    const near = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        const entered = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            near.add(entry.target);
            entered.push(entry.target);
          } else {
            near.delete(entry.target);
          }
        });
        measure(entered);
      },
      { rootMargin: '100% 0px' }
    );
    bios.forEach((bio) => observer.observe(bio));

    const onResize = () => measure([...near]);
    window.addEventListener('resize', onResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, deps);
}
