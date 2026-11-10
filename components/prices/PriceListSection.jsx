import { useEffect, useRef } from 'react';
import styles from '../../styles/preturiList.module.css';
import { PHONE_DISPLAY, PHONE_HREF } from '../../utils/clinicContact';
import { PRICE_CATEGORIES } from '../../utils/tarife';
import CategoryAccordion from './CategoryAccordion';
import { setAllDetails } from './useRevealOnHash';

/** The accordions, with a control to open or close them all and the search result state. */
const PriceListSection = ({ filter }) => {
  const listRef = useRef(null);

  // A search opens every category that still has a matching row.
  useEffect(() => {
    if (filter.active) {
      listRef.current?.querySelectorAll('details:not([hidden])').forEach((details) => {
        details.open = true;
      });
    }
  }, [filter]);

  return (
    <section className={`${styles.shell} ${styles.listSection}`} aria-labelledby="lista-preturi">
      <div className={styles.listHead}>
        <h2 id="lista-preturi" className={styles.listTitle}>
          Lista de prețuri
        </h2>
        <div className={styles.listControls}>
          <button type="button" className={styles.linkButton} onClick={() => setAllDetails(listRef.current, true)}>
            Deschide toate
          </button>
          <button type="button" className={styles.linkButton} onClick={() => setAllDetails(listRef.current, false)}>
            Închide toate
          </button>
        </div>
      </div>
      {filter.active && filter.total === 0 && (
        <p className={styles.noResults} role="note">
          Nu am găsit un serviciu cu acest nume. Încearcă alt cuvânt sau sună-ne la <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>.
        </p>
      )}
      <div className={styles.accordions} ref={listRef}>
        {PRICE_CATEGORIES.map((category, index) => (
          <CategoryAccordion
            key={category.id}
            category={category}
            defaultOpen={index === 0}
            hidden={filter.active && filter.countsByCategory[category.id] === 0}
            visibleIds={filter.visibleIds}
          />
        ))}
      </div>
    </section>
  );
};

export default PriceListSection;
