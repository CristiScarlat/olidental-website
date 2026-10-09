import CustomCarousel from '../components/carousel';
import ServiceHubCards from '../components/serviceHubCards';
import { carouselPicsServices, services } from '../utils/uiConstants';
import { buildCarouselAltTextGetter } from '../utils/carouselAlt';
import { toWebp } from '../utils/images';

// Descriptive, non-identical alt text for the services carousel slides.
const getServicesCarouselAltText = buildCarouselAltTextGetter([
  'Tratament stomatologic Olidental Clinic Timișoara',
  'Serviciu de estetică dentară Olidental Clinic',
  'Procedură de implantologie orală Olidental Clinic',
  'Reabilitare orală complexă Olidental Clinic',
]);

// Optimized intrinsic size hint (actual originals are ~16:9) so the browser
// can reserve layout space and avoid CLS; display size is CSS-controlled.
const SERVICES_CAROUSEL_IMAGE_WIDTH = 1200;
const SERVICES_CAROUSEL_IMAGE_HEIGHT = 675;

// Short, hub-specific summaries per category (deliberately distinct wording
// from each service's own page, keyed by the service's real `link` from
// uiConstants.js, so this stays in sync if a service is ever reordered).
const CATEGORY_SUMMARIES = {
  '/estetica-zambetului':
    'Fațete, coroane integral ceramice și restaurări protetice estetice, alese în funcție de starea inițială a dinților și de obiectivele fiecărui pacient. Tratamentele sunt precedate de o evaluare digitală a zâmbetului, astfel încât rezultatul final să poată fi anticipat încă din faza de planificare.',
  '/implantologie':
    'Soluția recomandată pentru înlocuirea dinților lipsă: o rădăcină artificială inserată în os, urmată de restaurarea protetică a dintelui. Tratamentul are două etape distincte, chirurgicală și protetică, iar durata dintre ele variază în funcție de particularitățile fiecărui caz.',
  '/reabilitari-orale-complexe':
    'Pentru cazurile care implică mai multe structuri ale aparatului dentar deodată: implantologie, protetică și, atunci când este necesar, tratament parodontal sau ortodontic, coordonate într-un singur plan de tratament individualizat.',
};

const ServicesPage = () => {

  return (
    <>
      {/* Kept for SEO, but compact so the page still opens on the carousel like the original design. */}
      <h1 className='text-center pt-3 px-3' style={{ fontSize: 'clamp(1.5rem, 5vw, 2.25rem)' }}>
        Servicii stomatologice Olidental Clinic Timișoara
      </h1>
      <div className='d-flex justify-content-center m-3'>
        {/* Full width + fixed 16:9 box: as a shrink-to-fit flex item the carousel
            started near 0px wide and pushed the cards below down once the JS ran. */}
        <div style={{ width: '100%', maxWidth: '50rem', aspectRatio: '16 / 9' }}>
          <CustomCarousel showThumbs={false}>
            {carouselPicsServices.map((pic, index) => (
              <div key={pic}>
                <img
                  src={toWebp(`/images/carouselServices/thumbnail_${pic}`)}
                  alt={getServicesCarouselAltText(index)}
                  width={SERVICES_CAROUSEL_IMAGE_WIDTH}
                  height={SERVICES_CAROUSEL_IMAGE_HEIGHT}
                  loading={index === 0 ? undefined : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                  style={{ borderRadius: 10, height: 'auto' }}
                />
              </div>
            ))}
          </CustomCarousel>
        </div>
      </div>
      <ServiceHubCards services={services} summaries={CATEGORY_SUMMARIES} />
    </>
  );
};

ServicesPage.seo = {
  title: "Servicii stomatologice | Olidental Clinic Timișoara",
  description: "Serviciile stomatologice Olidental Clinic Timișoara: estetica zâmbetului, implantologie orală și reabilitări orale complexe.",
  canonical: "https://olidental.ro/servicii",
};

export default ServicesPage;
