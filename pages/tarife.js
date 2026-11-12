// The clinic price list ("tarife olidental.docx", 2026-11-10): data in utils/tarife, JSON-LD in utils/priceSchema.
import { useCallback, useMemo, useRef, useState } from 'react';
import styles from '../styles/tarife.module.css';
import FrauncesFont from '../components/FrauncesFont';
import CategoryCards from '../components/prices/CategoryCards';
import OpenHashSectionScript from '../components/prices/OpenHashSectionScript';
import PriceCta from '../components/prices/PriceCta';
import PriceFaq from '../components/prices/PriceFaq';
import PriceHero from '../components/prices/PriceHero';
import PriceListSection from '../components/prices/PriceListSection';
import PriceSteps from '../components/prices/PriceSteps';
import { useOpenAllOnPrint, useRevealOnHash } from '../components/prices/useRevealOnHash';
import { getPageDate } from '../utils/pageDates';
import { buildPriceCatalogSchema } from '../utils/priceSchema';
import { ALL_PRICE_ROWS } from '../utils/tarife';
import { filterRows } from '../utils/tarife/search';

const PAGE_PATH = '/tarife';

const Tarife = () => {
  const pageRef = useRef(null);
  const [query, setQuery] = useState('');
  const clearSearch = useCallback(() => setQuery(''), []);
  useRevealOnHash(pageRef, clearSearch);
  useOpenAllOnPrint(pageRef);

  const filter = useMemo(() => filterRows(ALL_PRICE_ROWS, query), [query]);

  return (
    <div className={styles.page} ref={pageRef}>
      <FrauncesFont />
      <PriceHero updated={getPageDate(PAGE_PATH)} query={query} onQueryChange={setQuery} filter={filter} />
      <CategoryCards hidden={filter.active} />
      <PriceListSection filter={filter} />
      <OpenHashSectionScript />
      <PriceSteps />
      <PriceFaq />
      <PriceCta />
    </div>
  );
};

Tarife.seo = {
  title: 'Tarife stomatologie Timișoara: lista completă | Olidental',
  description:
    'Lista de tarife Olidental Clinic Timișoara, în lei și euro: consultație, implant dentar, coroane, ortodonție, stomatologie pentru copii și altele.',
  canonical: 'https://olidental.ro/tarife',
  // The price catalog comes from the page itself (not utils/schema.js), so the price data
  // stays out of the bundle every other page loads.
  schema: [buildPriceCatalogSchema()],
};

export default Tarife;
