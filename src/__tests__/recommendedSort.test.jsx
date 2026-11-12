import { render, fireEvent, within } from '@testing-library/react';
import { tutors } from '../data/tutors';
import { getVisibleTutors } from '../utils/catalog';
import { tutorScore } from '../utils/rating';
import { DEFAULT_FILTERS } from '../App';
import App from '../App';

vi.mock('../utils/rating', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, tutorScore: vi.fn(actual.tutorScore) };
});

beforeEach(() => {
  localStorage.clear();
  tutorScore.mockClear();
});

test('бал кожного репетитора рахується не більше одного разу', async () => {
  const { getByRole } = render(<App />);

  const firstCard = () => document.querySelector('.tutor-card');
  fireEvent.click(within(firstCard()).getByRole('button', { name: 'Додати в обрані' }));
  fireEvent.click(within(firstCard()).getByRole('button', { name: 'Прибрати з обраних' }));

  const sort = getByRole('combobox', { name: /Сортування/ });
  fireEvent.change(sort, { target: { value: 'price-asc' } });
  fireEvent.change(sort, { target: { value: 'recommended' } });

  expect(tutorScore.mock.calls.length).toBeLessThanOrEqual(tutors.length);
}, 120000);

test('порядок "Рекомендованих" той самий, що й за справжнім балом', () => {
  const actual = getVisibleTutors(tutors, { query: '', filters: DEFAULT_FILTERS, sortBy: 'recommended' });
  const expected = tutors
    .filter((t) => t.pricePerHour <= DEFAULT_FILTERS.maxPrice)
    .map((t) => ({ id: t.id, score: tutorScore.getMockImplementation()(t) }))
    .sort((a, b) => b.score - a.score)
    .map((t) => t.id);

  expect(actual.map((t) => t.id)).toEqual(expected);
});
