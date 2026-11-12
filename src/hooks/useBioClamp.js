import { useLayoutEffect } from 'react';

function isInViewport(rect) {
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

export function useBioClamp(containerRef, deps) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const update = () => {
      container.querySelectorAll('.tutor-card__bio').forEach((bio) => {
        if (!isInViewport(bio.getBoundingClientRect())) return;
        bio.classList.remove('is-clamped');
        const fullHeight = bio.offsetHeight;
        bio.classList.add('is-clamped');
        bio.closest('.tutor-card').toggleAttribute('data-has-more', fullHeight > bio.offsetHeight + 1);
      });
    };

    update();
    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, deps);
}
