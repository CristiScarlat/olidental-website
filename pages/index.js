//import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';
import { carouselPicsHome, smilesGallery } from '../utils/uiConstants';
import Link  from "next/link";
import GoogleReviews from "../components/reviewsCarousel";
import { buildCarouselAltTextGetter } from '../utils/carouselAlt';
import { GOOGLE_MAPS_URL, GOOGLE_RATING } from '../utils/schema';
import styles from '../styles/home.module.css';
import { MdMedicalServices, MdSchool, MdGroups, MdHealthAndSafety } from 'react-icons/md';

import dynamic from 'next/dynamic'

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
    text: 'De la un dinte fațetat, până la reabilitări complexe cu implanturi și chirurgie parodontală. Planul pornește mereu de la starea reală a pacientului, nu de la un pachet standard.',
  },
  {
    Icon: MdSchool,
    title: 'Echipă cu experiență academică',
    text: 'Coordonată de Dr. Olimpiu Ladislau Karancsi, medic primar protetică dentară și șef de lucrări la UMF „Victor Babeș” Timișoara.',
  },
  {
    Icon: MdGroups,
    title: 'Specializări complete, sub un acoperiș',
    text: 'Implantologie, chirurgie dento-alveolară, endodonție, parodontologie, ortodonție și stomatologie pediatrică.',
  },
  {
    Icon: MdHealthAndSafety,
    title: 'Corectăm și tratamente eșuate',
    text: 'O parte din pacienții noștri vin după intervenții începute greșit în alte cabinete. Pornim mereu de la corectarea completă a situației.',
  },
];

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
              Servicii stomatologice premium, de la un singur dinte fațetat până la reabilitări
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
            <h3>{title}</h3>
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
                    src={`/images/services/${smilesGallery.dirPath}/${pic}`}
                    alt={`Rezultat tratament stomatologic Olidental Clinic ${index + 1}`}
                    width={150}
                    height={100}
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
      <div id='contact'><Location className="pt-3 pb-3 bg-gray"/></div>
    </>
  );
};

Home.seo = {
  title: "Olidental Clinic Timișoara - Servicii stomatologice premium în Timișoara",
  description: "Olidental Clinic Timișoara oferă servicii stomatologice premium, doctorii clinicii având specialități și competențe pentru o gamă cuprinzătoare de tratamente dentare.",
  canonical: "https://olidental.ro",
};

export default Home;
