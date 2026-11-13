// The clinic price list ("tarife olidental med 2.docx", 2026-11-13): data in utils/tarife, JSON-LD in utils/priceSchema.
import styles from '../styles/tarife.module.css';
import FrauncesFont from '../components/FrauncesFont';
import PriceCta from '../components/prices/PriceCta';
import PriceFaq from '../components/prices/PriceFaq';
import PriceGroups from '../components/prices/PriceGroups';
import PriceHero from '../components/prices/PriceHero';
import { getPageDate } from '../utils/pageDates';
import { buildPriceCatalogSchema } from '../utils/priceSchema';

const PAGE_PATH = '/tarife';

const Tarife = () => (
  <div className={styles.page}>
    <FrauncesFont />
    <PriceHero updated={getPageDate(PAGE_PATH)} />
    <PriceGroups />
    <PriceFaq />
    <PriceCta />
  </div>
);

Tarife.seo = {
  title: 'Tarife și prețuri stomatologie Timișoara | Olidental',
  description:
    'Tarife și prețuri Olidental Clinic Timișoara, în euro: implant dentar, dinți ficși, consultație, coroane, ortodonție, stomatologie pentru copii și altele.',
  canonical: 'https://olidental.ro/tarife',
  // The price catalog comes from the page itself (not utils/schema.js), so the price data
  // stays out of the bundle every other page loads.
  schema: [buildPriceCatalogSchema()],
};

export default Tarife;
