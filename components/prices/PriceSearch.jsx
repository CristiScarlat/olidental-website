import { useRef } from 'react';
import { FaMagnifyingGlass, FaXmark } from 'react-icons/fa6';
import styles from '../../styles/tarife.module.css';
import { formatCount } from '../../utils/formatCount';
import { SEARCH_LABEL, SEARCH_PLACEHOLDER } from '../../utils/tarife/pageText';

/**
 * Filters the price list as the visitor types. Without JavaScript the whole
 * list is simply shown, so the search is an extra, not a requirement.
 */
const PriceSearch = ({ query, onQueryChange, filter }) => {
  const inputRef = useRef(null);
  // The clear button disappears with the text, so focus goes back to the field.
  const clear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };
  const status = filter.active
    ? filter.total > 0
      ? formatCount(filter.total, 'rezultat', 'rezultate')
      : 'Niciun rezultat'
    : '';

  return (
    <div className={styles.search} role="search">
      <label htmlFor="cauta-pret" className={styles.searchLabel}>
        {SEARCH_LABEL}
      </label>
      <div className={styles.searchField}>
        <FaMagnifyingGlass className={styles.searchIcon} aria-hidden="true" />
        <input
          id="cauta-pret"
          ref={inputRef}
          type="search"
          className={styles.searchInput}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={SEARCH_PLACEHOLDER}
          autoComplete="off"
          enterKeyHint="search"
        />
        {query && (
          <button type="button" className={styles.searchClear} onClick={clear} aria-label="Șterge căutarea">
            <FaXmark aria-hidden="true" />
          </button>
        )}
      </div>
      <p className={styles.searchStatus} role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
};

export default PriceSearch;
