import { memo } from 'react';
import RatingStars from './RatingStars';
import { averageRating } from '../utils/rating';
import { formatPrice, pluralize, FORMAT_LABELS } from '../utils/format';

function TutorCard({ tutor, isFavorite, isSelected, onSelect, onToggleFavorite }) {
  const select = () => onSelect(tutor.id);
  const rating = averageRating(tutor.reviews);
  const reviewsCount = tutor.reviews.length;

  return (
    <article className={'tutor-card' + (isSelected ? ' tutor-card--selected' : '')}>
      <div className="tutor-card__media">
        <img className="tutor-card__photo" src={tutor.photo} alt={tutor.name} />
        <button
          type="button"
          className={'tutor-card__fav' + (isFavorite ? ' is-active' : '')}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Прибрати з обраних' : 'Додати в обрані'}
          onClick={() => onToggleFavorite(tutor.id)}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
      <div className="tutor-card__body">
        <h3 className="tutor-card__name">
          {tutor.name}
          {tutor.verified && (
            <span className="badge" title="Документи перевірено">
              ✓
            </span>
          )}
        </h3>
        <div className="tutor-card__meta">
          {tutor.city} · {FORMAT_LABELS[tutor.format]} · {tutor.experienceYears}{' '}
          {pluralize(tutor.experienceYears, 'рік', 'роки', 'років')} досвіду
        </div>
        <ul className="tutor-card__tags">
          {tutor.subjects.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="tutor-card__rating">
          <RatingStars value={rating} />
          <span>
            {rating.toFixed(1)} ({reviewsCount}{' '}
            {pluralize(reviewsCount, 'відгук', 'відгуки', 'відгуків')})
          </span>
        </div>
        <p className="tutor-card__bio is-clamped">{tutor.bio}</p>
        <button type="button" className="link-button tutor-card__more" onClick={select}>
          Читати далі
        </button>
        <div className="tutor-card__footer">
          <span className="tutor-card__price">
            {formatPrice(tutor.pricePerHour)}
            <small> / год</small>
          </span>
          <button type="button" className="button button--ghost" onClick={select}>
            Детальніше
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(TutorCard);
