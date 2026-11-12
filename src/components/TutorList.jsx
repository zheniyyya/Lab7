import { useRef } from 'react';
import TutorCard from './TutorCard';
import { useBioClamp } from '../hooks/useBioClamp';

export default function TutorList({
  tutors,
  favorites,
  selectedId,
  onSelect,
  onToggleFavorite,
  style,
}) {
  const containerRef = useRef(null);
  useBioClamp(containerRef, [tutors]);

  return (
    <div className="tutor-grid" ref={containerRef} style={style}>
      {tutors.map((tutor) => (
        <TutorCard
          key={tutor.id}
          tutor={tutor}
          isFavorite={favorites.includes(tutor.id)}
          isSelected={tutor.id === selectedId}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
