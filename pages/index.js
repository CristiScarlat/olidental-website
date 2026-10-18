//import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';
import { carouselPicsHome, smilesGallery } from '../utils/uiConstants';
import Link  from "next/link";
import GoogleReviews from "../components/reviewsCarousel";
import { buildCarouselAltTextGetter } from '../utils/carouselAlt';
import { GOOGLE_MAPS_URL, GOOGLE_RATING } from '../utils/schema';
import { teamMemberPath } from '../utils/team';
import { CITY, FOUNDING_YEAR, OPENING_HOURS, PHONE_DISPLAY, PHONE_HREF, STREET_ADDRESS } from '../utils/clinicContact';
import { formatCount } from '../utils/formatCount';
import styles from '../styles/home.module.css';
import { MdMedicalServices, MdSchool, MdGroups, MdHealthAndSafety } from 'react-icons/md';

import dynamic from 'next/dynamic'
import { toWebp } from '../utils/images';

// Descriptive, non-identical alt text for the homepage hero carousel slides
// (clinic/treatment photos). Cycled by index so every slide gets distinct,
// meaningful text instead of a single repeated placeholder.
const getCarouselAltText = buildCarouselAltTextGetter([
  'Cabinet stomatologic Olidental Clinic Timișoara',
  'Sală de tratament Olidental Clinic Timișoara',
  'Echipamente stomatologice moderne Olidental Clinic',
  'Recepția Olidental Clinic Timișoara',
  'Zonă de așteptare pacienți Olidental Clinic',
  'Detaliu tratament stomatologic Olidental Clinic',
]);

// carouselPicsHome entries look like "1.JPG"; the optimized asset written by
// scripts/optimize-carousel-images.js is "thumbnail_<name>.webp".
const getCarouselWebpSrc = (pic) => {
  const baseName = pic.replace(/\.[^.]+$/, '');
  return `/images/carouselHome/thumbnail_${baseName}.webp`;
};

// Intrinsic size used for the hero carousel images (all optimized to this
// max width, ~3:2 aspect ratio) so the browser can reserve layout space and
// avoid CLS; actual display size is controlled by the carousel's own CSS.
const CAROUSEL_IMAGE_WIDTH = 900;
const CAROUSEL_IMAGE_HEIGHT = 600;

// Same facts as before, restructured into short, scannable cards instead of
// dense paragraphs — no new claims, just a different presentation.
const BENEFITS = [
  {
    Icon: MdMedicalServices,
    title: 'Tratamente pe măsura fiecărui caz',
    text: 'De la un dinte fațetat, până la reabilitări complexe cu implanturi și chirurgie parodontală. Planul pornește mereu de la starea reală a pacientului.',
  },
  {
    Icon: MdSchool,
    title: 'Echipă cu experiență academică',
    text: 'Coordonată de Dr. Olimpiu Ladislau Karancsi, șef de lucrări la UMF „Victor Babeș” Timișoara.',
  },
  {
    Icon: MdGroups,
    title: 'Tratamente sub același acoperiș',
    text: 'Oferim următoarele servicii: implantologie, chirurgie dento-alveolară, endodonție, parodontologie, ortodonție și stomatologie pediatrică.',
  },
  {
    Icon: MdHealthAndSafety,
    title: 'Refacerea unor tratamente anterioare',
    text: 'O parte din pacienții noștri vin pentru refacerea unor tratamente anterioare. Pornim mereu de la evaluarea completă a situației.',
  },
];

// The founder's own page (/echipa/<slug>), or his block on /echipa if he has none.
const FOUNDER_NAME = 'Dr. Olimpiu Ladislau Karancsi';
const FOUNDER_HREF = teamMemberPath({ title: FOUNDER_NAME });

// Plain-text facts about the clinic, so search engines and AI answers can
// quote them from the page itself (the footer, the hero badge and the icon
// contact block are dropped as boilerplate). Facts only, no claims, and no
// professional grade (medic primar/specialist) until the clinic confirms them.
const AboutClinic = () => (
  <section className={styles.about} aria-labelledby="despre-clinica">
    <h2 id="despre-clinica" className="text-center mb-3">Despre clinică</h2>
    <p>
      Olidental Clinic {CITY} este o clinică stomatologică fondată în {FOUNDING_YEAR} și
      coordonată de <Link href={FOUNDER_HREF}>{FOUNDER_NAME}</Link>, șef de lucrări la UMF
      „Victor Babeș” {CITY}. Clinica se află pe {STREET_ADDRESS},{' '}
      {CITY}, și oferă servicii de estetică a zâmbetului, implantologie orală și reabilitări orale
      complexe. Programul este de luni până vineri, între {OPENING_HOURS.opens} și{' '}
      {OPENING_HOURS.closes}. Programările se fac telefonic, la{' '}
      <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>, sau prin <Link href="/programare">programare online</Link>.
      Clinica are nota {GOOGLE_RATING.value} din{' '}
      {formatCount(GOOGLE_RATING.count, 'recenzie', 'recenzii')} Google.
    </p>
  </section>
);

const Home = () => {

  const DynamicCarousel = dynamic(() => import('../components/carousel'))

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroFrame}>
          {/* Server-rendered first slide — this is what actually ships in the
              static export (out/index.html); the carousel below is client-only
              (dynamic() import never renders during static generation, even
              without ssr:false — confirmed empirically in the build output) and
              would otherwise leave the hero completely empty until hydration,
              tanking LCP and causing a CLS jump. This static image is the real
              LCP element; the carousel visually replaces it once JS mounts. */}
          <img
            className={styles.heroStaticSlide}
            src={getCarouselWebpSrc(carouselPicsHome[0])}
            alt={getCarouselAltText(0)}
            width={CAROUSEL_IMAGE_WIDTH}
            height={CAROUSEL_IMAGE_HEIGHT}
            fetchPriority="high"
          />
          <div className={styles.heroCarouselMount}>
          <DynamicCarousel showThumbs={false}>
            {carouselPicsHome.map((pic, index) => (
              <div key={pic}>
                <img
                  src={getCarouselWebpSrc(pic)}
                  alt={getCarouselAltText(index)}
                  width={CAROUSEL_IMAGE_WIDTH}
                  height={CAROUSEL_IMAGE_HEIGHT}
                  loading={index === 0 ? undefined : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : undefined}
                />
              </div>
            ))}
          </DynamicCarousel>
          </div>
          <div className={styles.heroGradient} />
          <div className={styles.heroContent}>
            <h1>Olidental Clinic Timișoara</h1>
            <p className={styles.heroSubtitle}>
              Servicii stomatologice, de la un singur dinte fațetat până la reabilitări
              orale complexe.
            </p>
            <div className={styles.heroActions}>
              <Link href="/programare" className={styles.heroCta}>Programează-te</Link>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.heroRating}>
                <span className={styles.heroStars} aria-hidden="true">★★★★★</span>
                {GOOGLE_RATING.value} · {GOOGLE_RATING.count} recenzii Google
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.benefits}>
        {BENEFITS.map(({ Icon, title, text }) => (
          <div key={title} className={styles.benefitCard}>
            <span className={styles.benefitIconWrap}>
              <Icon className={styles.benefitIcon} aria-hidden="true" />
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
        ))}
      </div>

        <Link href="/rezultate" legacyBehavior>
          <a style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="band-with-label">
              <h2 className="m-0">Rezultate</h2>
              <div className="d-flex gap-3 w-100 overflow-auto justify-content-center">
              {smilesGallery.images.filter((photo, index) => index <= 2).map((pic, index) => (
                  <img
                    key={`/images/services/${smilesGallery.dirPath}/${pic}`}
                    src={toWebp(`/images/services/${smilesGallery.dirPath}/${pic}`)}
                    alt={`Rezultat tratament stomatologic Olidental Clinic ${index + 1}`}
                    width={150}
                    height={100}
                    loading="lazy"
                    decoding="async"
                    style={{ borderRadius: 10, width: 150 }}
                  />
              ))}
              </div>
            </div>
          </a>
        </Link>

        <GoogleReviews />

      <div id='services'><Services /></div>
      {/*<div id='team'><Specialists /></div>*/}
      <AboutClinic />
      <div id='contact'><Location className="pt-3 pb-3 bg-gray"/></div>
    </>
  );
};

Home.seo = {
  title: "Olidental Clinic Timișoara | Implant, fațete, reabilitări",
  description: "Olidental Clinic Timișoara: implantologie, fațete și coroane ceramice, reabilitări orale complexe și stomatologie generală, realizate de medici cu experiență.",
  canonical: "https://olidental.ro",
};

export default Home;
