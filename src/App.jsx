import { useCallback, useMemo, useState } from 'react';
import { tutors } from './data/tutors';
import { getVisibleTutors } from './utils/catalog';
import { useReferenceData } from './hooks/useReferenceData';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import TutorList from './components/TutorList';
import TutorDetails from './components/TutorDetails';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';

export const DEFAULT_FILTERS = {
  subjects: [],
  city: '',
  format: 'all',
  maxPrice: 1200,
  verifiedOnly: false,
};

export default function App() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState('recommended');
  const [selectedId, setSelectedId] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('tutor-favorites', []);
  const [toast, setToast] = useState(null);
  const reference = useReferenceData();

  const visible = useMemo(
    () => getVisibleTutors(tutors, { query, filters, sortBy }),
    [query, filters, sortBy]
  );
  const selected = tutors.find((t) => t.id === selectedId);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    },
    [setFavorites]
  );

  const book = (tutor) => {
    setToast(`Заявку для ${tutor.name} надіслано. Репетитор зв'яжеться з вами найближчим часом.`);
    setSelectedId(null);
  };

  return (
    <div className="app">
      <Header favoritesCount={favorites.length} total={tutors.length} />
      <main className="layout">
        <Filters
          filters={filters}
          reference={reference}
          tutors={tutors}
          onChange={(patch) => setFilters({ ...filters, ...patch })}
          onReset={() => setFilters(DEFAULT_FILTERS)}
        />
        <section className="results">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            count={visible.length}
          />
          {visible.length === 0 ? (
            <EmptyState query={query} tutors={tutors} onPick={setQuery} />
          ) : (
            <TutorList
              tutors={visible}
              favorites={favorites}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onToggleFavorite={toggleFavorite}
              style={{ marginTop: 16 }}
            />
          )}
        </section>
      </main>
      {selected && (
        <TutorDetails
          tutor={selected}
          isFavorite={favorites.includes(selected.id)}
          onToggleFavorite={() => toggleFavorite(selected.id)}
          onClose={() => setSelectedId(null)}
          onBook={() => book(selected)}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
