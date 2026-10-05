import Link from "next/link";
import { ImFacebook, ImInstagram } from 'react-icons/im';
import { MdLocationOn, MdOutlineMail, MdPhone, MdAccessTime } from 'react-icons/md';
import { services } from '../utils/uiConstants';
import styles from './styles/footer.module.css';

// Contact details, kept identical to the /contact page (components/location.jsx)
// and the Dentist schema (utils/schema.js).
const PHONE_DISPLAY = '+40 733.023.030';
const PHONE_HREF = 'tel:+40733023030';
const EMAIL = 'clinica@olidental.ro';
const ADDRESS_LINES = ['Strada Ștefan cel Mare 53, Parter', '(intrare de pe Gh. Asachi)', 'Timișoara 307200'];
// Plain Maps link (no embed), so the footer sets no third-party cookies.
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Olidental%20Clinic%2C%20Strada%20%C8%98tefan%20cel%20Mare%2053%2C%20Timi%C8%99oara';
const HOURS_LINES = ['Luni – Vineri: 09:30 – 18:30', 'Sâmbătă, Duminică: închis'];

const SOCIAL_LINKS = [
  { href: 'https://www.facebook.com/OlidentalClinic/', label: 'Olidental Clinic pe Facebook', Icon: ImFacebook },
  { href: 'https://www.instagram.com/olidental.clinic/', label: 'Olidental Clinic pe Instagram', Icon: ImInstagram },
];

// Built from uiConstants so the footer follows the services if they change.
const SERVICE_LINKS = [
  ...services.map(({ title, link }) => ({ label: title, href: link })),
  { label: 'Toate serviciile', href: '/servicii' },
];

const CLINIC_LINKS = [
  { label: 'Rezultate', href: '/rezultate' },
  { label: 'Zâmbete', href: '/zambete' },
  { label: 'Echipa', href: '/echipa' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

// ANPC Order 449/2022 as amended by Order 270/2026: the SAL pictogram links to
// the ANPC complaints portal. The image is ANPC's own "online" file (201×50).
const SAL_URL = 'https://reclamatiisal.anpc.ro/';
const SAL_IMAGE = '/images/anpc/sal-pictograma.png';
const SAL_IMAGE_WIDTH = 201;
const SAL_IMAGE_HEIGHT = 50;
const ANPC_URL = 'https://anpc.ro/';

const COMPANY_DETAILS = ['Olidental Clinic, operat de OLIDENTAL MED SRL', 'CIF RO35302885', 'RC J35/2982/2015'];

const FooterLinkColumn = ({ title, links }) => (
  <nav aria-label={title}>
    <h2 className={styles.heading}>{title}</h2>
    <ul className={styles.linkList}>
      {links.map(({ label, href }) => (
        <li key={href}>
          <Link href={href} className={styles.link}>{label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

// Same icons as the /contact page, on a white disc so the green stays visible
// on the grey. The icon is decorative: the text next to it carries the info.
const FooterContactItem = ({ Icon, children }) => (
  <li className={styles.contactItem}>
    <span className={styles.contactIcon} aria-hidden="true"><Icon /></span>
    <div className={styles.contactText}>{children}</div>
  </li>
);

const LegalLinks = ({ onOpenCookieSettings }) => (
  <ul className={styles.legalLinks}>
    <li><Link href='/politica-confidentialitate'>Politica de confidențialitate</Link></li>
    <li><Link href='/politica-cookies'>Politica de cookies</Link></li>
    {onOpenCookieSettings && (
      <li>
        <button type="button" className={styles.linkButton} onClick={onOpenCookieSettings}>Setări cookie-uri</button>
      </li>
    )}
    <li><Link href='/termen-conditii'>Termeni și condiții</Link></li>
    <li><Link href='/termen-conditii/#litigii'>Politica de soluționare a litigiilor</Link></li>
    <li><a href={ANPC_URL} target="_blank" rel="noopener noreferrer">ANPC</a></li>
  </ul>
);

const Footer = ({ onOpenCookieSettings }) => {
  return (
    <footer className={styles.footer} id='footer'>
      <div className='container'>
        <div className={`row ${styles.main}`}>
          <div className='col-12 col-md-6 col-lg-4'>
            <Link href='/' className={styles.logoLink}>
              <img
                src='/images/logo-olidental-clinic.webp'
                alt='Olidental Clinic – pagina principală'
                width={345}
                height={100}
                loading='lazy'
                className={styles.logo}
              />
            </Link>
            <p className={styles.tagline}>Servicii stomatologice premium în Timișoara</p>
            <Link href='/programare' className={styles.cta}>Programează o consultație</Link>
            <ul className={styles.social}>
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={styles.socialLink}>
                    <Icon aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className='col-12 col-md-6 col-lg-4'>
            <h2 className={styles.heading}>Contact</h2>
            <address className={styles.address}>
              <ul className={styles.contactList}>
                <FooterContactItem Icon={MdLocationOn}>
                  {ADDRESS_LINES.map((line) => <span key={line} className='d-block'>{line}</span>)}
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className={styles.mapLink}>Vezi pe hartă</a>
                </FooterContactItem>
                <FooterContactItem Icon={MdPhone}>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </FooterContactItem>
                <FooterContactItem Icon={MdOutlineMail}>
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </FooterContactItem>
                <FooterContactItem Icon={MdAccessTime}>
                  {HOURS_LINES.map((line) => <span key={line} className='d-block'>{line}</span>)}
                </FooterContactItem>
              </ul>
            </address>
          </div>

          <div className='col-6 col-lg-2'>
            <FooterLinkColumn title='Servicii' links={SERVICE_LINKS} />
          </div>

          <div className='col-6 col-lg-2'>
            <FooterLinkColumn title='Clinica' links={CLINIC_LINKS} />
          </div>
        </div>

        <div className={styles.legal}>
          <LegalLinks onOpenCookieSettings={onOpenCookieSettings} />
          <div className={styles.legalMeta}>
            <p className={styles.company}>
              {COMPANY_DETAILS.map((detail) => <span key={detail}>{detail}</span>)}
            </p>
            <a href={SAL_URL} target="_blank" rel="noopener noreferrer" className={styles.sal}>
              <img
                src={SAL_IMAGE}
                alt='Soluționarea alternativă a litigiilor – ANPC'
                width={SAL_IMAGE_WIDTH}
                height={SAL_IMAGE_HEIGHT}
                loading='lazy'
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>Copyright {new Date().getFullYear()} &copy; Olidental Clinic. Toate drepturile rezervate.</span>
      </div>
    </footer>
  );
};

export default Footer;
