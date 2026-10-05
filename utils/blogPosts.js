// Blog article registry: the single source of truth for every article's
// metadata. Pages under pages/blog/ read their <head> data from here, the
// /blog index lists these entries, and utils/blogSchema.js builds the JSON-LD
// from the same fields — so the visible "Pe scurt" box and FAQ can never
// drift from the structured data Google and AI search engines read.
//
// Adding an article: add an entry below, create pages/blog/<slug>.js, and
// (if it has new photos) add a job in scripts/optimize-blog-images.js.

export const BLOG_PATH = '/blog';
export const BLOG_TITLE = 'Blog Olidental Clinic';
export const BLOG_AUTHOR_LABEL = 'Echipa Olidental Clinic';
const WORDS_PER_MINUTE = 200;

const MONTHS_RO = [
  'ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
  'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie',
];

export const blogPosts = [
  {
    slug: 'povestea-olidental-clinic',
    title: 'Povestea Olidental Clinic: Cum am transformat stomatologia dintr-o grijă într-o experiență a încrederii',
    shortTitle: 'Povestea Olidental Clinic',
    seoTitle: 'Povestea Olidental Clinic | Stomatologie în Timișoara',
    description:
      'Cum a luat naștere Olidental Clinic din Timișoara: viziunea Dr. Olimpiu Karancsi, confortul pacientului, tehnici minim invazive și grija pentru fiecare zâmbet.',
    excerpt:
      'Din dorința de a schimba percepția asupra vizitei la dentist s-a născut Olidental Clinic. Povestea clinicii, spusă de la oameni: viziunea Dr. Oli, confortul, tehnologia și calitatea.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    section: 'Despre noi',
    // Words inside <article> (story + "Pe scurt" + FAQ + boxes), measured
    // on the built page; drives reading time and BlogPosting.wordCount.
    wordCount: 901,
    heroImage: {
      src: '/images/blog/povestea-olidental-clinic/receptie-1200.webp',
      srcSet:
        '/images/blog/povestea-olidental-clinic/receptie-800.webp 800w, /images/blog/povestea-olidental-clinic/receptie-1200.webp 1200w, /images/blog/povestea-olidental-clinic/receptie-1600.webp 1600w',
      width: 1200,
      height: 800,
      alt: 'Recepția Olidental Clinic din Timișoara, cu zona de așteptare și un fotoliu turcoaz',
      og: '/images/blog/povestea-olidental-clinic/og-1200x630.jpg',
    },
    keyTakeaways: [
      'Olidental Clinic este o clinică de stomatologie integrată din Timișoara, fondată în 2015 de Dr. Olimpiu Karancsi, cunoscut de pacienți ca Dr. Oli.',
      'Dr. Oli este medic primar protetică dentară, medic specialist chirurgie dento-alveolară, are atestat în implantologie orală și este șef de lucrări la UMF „Victor Babeș” Timișoara.',
      'Clinica tratează estetica zâmbetului, implantologie orală, reabilitări orale complexe și protetică dentară, alături de ortodonție și igienizări periodice.',
      'Pilonii clinicii sunt siguranța și confortul pacientului, tehnicile minim invazive și explicarea pe înțelesul tuturor a fiecărei etape de tratament.',
      'Adresa: Strada Ștefan cel Mare 53, Timișoara. Program: luni–vineri, 09:30–18:30. Telefon: 0733 023 030.',
    ],
    faq: [
      {
        question: 'Unde se află Olidental Clinic?',
        answer:
          'Olidental Clinic se află în Timișoara, pe Strada Ștefan cel Mare 53, la parter, cu intrarea de pe strada Gh. Asachi.',
        link: { href: '/contact', label: 'Vezi harta și datele de contact' },
      },
      {
        question: 'Cine a fondat Olidental Clinic?',
        answer:
          'Clinica a fost fondată în 2015 de Dr. Olimpiu Ladislau Karancsi (Dr. Oli), medic primar protetică dentară și șef de lucrări la UMF „Victor Babeș” Timișoara.',
        link: { href: '/echipa', label: 'Cunoaște echipa medicală' },
      },
      {
        question: 'Ce tratamente stomatologice oferă Olidental Clinic?',
        answer:
          'Estetica zâmbetului (fațete și coroane dentare integral ceramice), implantologie orală (inserare de implanturi și adiții de os, restaurări pe implanturi) și reabilitări orale complexe, alături de protetică dentară, endodonție, ortodonție, stomatologie pediatrică și igienizări periodice.',
        link: { href: '/servicii', label: 'Vezi toate serviciile' },
      },
      {
        question: 'Care este programul Olidental Clinic?',
        answer: 'Clinica este deschisă de luni până vineri, între orele 09:30 și 18:30.',
      },
      {
        question: 'Cum pot face o programare la Olidental Clinic?',
        answer:
          'Poți face o programare online, prin formularul de pe site, sau telefonic, la numărul 0733 023 030.',
        link: { href: '/programare', label: 'Programează-te online' },
      },
    ],
  },
  {
    slug: 'de-ce-sa-alegi-olidental-clinic',
    title: 'De ce să alegi Olidental Clinic? Servicii stomatologice complete în Timișoara',
    shortTitle: 'De ce să alegi Olidental Clinic',
    seoTitle: 'De ce să alegi Olidental Clinic Timișoara | Dr. Olimpiu Karancsi',
    description:
      'Descoperă Olidental Clinic din Timișoara: servicii stomatologice complete, imagistică 3D pe loc, tratamente minim invazive fără durere și soluții de finanțare.',
    excerpt:
      'Opt motive pentru care tot mai mulți pacienți își încredințează zâmbetul echipei Olidental Clinic: expertiza Dr. Oli, tratamente fără frică, Smile Design, imagistică 3D pe loc și un plan de tratament clar.',
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    section: 'Despre noi',
    // Words inside <article> minus the side column and "Citește și",
    // measured on the built page.
    wordCount: 1228,
    heroImage: {
      src: '/images/blog/de-ce-sa-alegi-olidental-clinic/analiza-zambet-1200.webp',
      srcSet:
        '/images/blog/de-ce-sa-alegi-olidental-clinic/analiza-zambet-800.webp 800w, /images/blog/de-ce-sa-alegi-olidental-clinic/analiza-zambet-1200.webp 1200w, /images/blog/de-ce-sa-alegi-olidental-clinic/analiza-zambet-1600.webp 1600w',
      width: 1200,
      height: 800,
      alt: 'Doi medici Olidental Clinic analizează pe ecrane mari fotografiile zâmbetului unui pacient',
      og: '/images/blog/de-ce-sa-alegi-olidental-clinic/og-1200x630.jpg',
    },
    keyTakeaways: [
      'Olidental Clinic este o clinică stomatologică din Timișoara, fondată și coordonată de Dr. Olimpiu Karancsi (Dr. Oli), medic primar protetician și cadru didactic universitar.',
      'Clinica are propriul centru de imagistică digitală: radiografii locale și panoramice (OPG) și tomografie computerizată 3D (CBCT), realizate pe loc.',
      'Prin Smile Design și simulări intraorale 3D, pacientul își poate previzualiza și „proba” noul zâmbet înainte de începerea procedurilor.',
      'Reabilitările orale complexe sunt tratate interdisciplinar de chirurg, proteticieni și ortodont, în colaborare cu un laborator de tehnică dentară.',
      'Fiecare pacient primește de la început un plan de tratament cu etapele, durata estimată și costurile, iar plata se poate eșalona prin parteneri de creditare.',
      'Adresa: Strada Ștefan cel Mare 53, Timișoara. Program: luni–vineri, 09:30–18:30. Telefon: 0733 023 030.',
    ],
    faq: [
      {
        question: 'Ce servicii stomatologice oferă Olidental Clinic?',
        answer:
          'Ortodonție, implantologie, protetică, endodonție și estetică dentară, reabilitări orale complexe, precum și radiologie dentară proprie: radiografii locale, panoramice (OPG) și tomografie computerizată 3D (CBCT).',
        link: { href: '/servicii', label: 'Vezi toate serviciile' },
      },
      {
        question: 'Pot face radiografie panoramică sau CBCT direct la Olidental Clinic?',
        answer:
          'Da. Clinica are propriul centru de imagistică digitală, unde radiografiile locale, radiografiile panoramice (OPG) și tomografia computerizată 3D (CBCT) se realizează pe loc, fără drumuri la alte cabinete de radiologie.',
      },
      {
        question: 'Pot vedea cum va arăta noul zâmbet înainte de tratament?',
        answer:
          'Da. Cu ajutorul Smile Design și al simulărilor intraorale 3D îți poți previzualiza și chiar „proba” noul zâmbet înainte de începerea procedurilor, astfel încât rezultatul final să se potrivească dorințelor tale și fizionomiei feței.',
        link: { href: '/estetica-zambetului', label: 'Află mai multe despre estetica zâmbetului' },
      },
      {
        question: 'Mi-e frică de dentist. Pot veni la Olidental Clinic?',
        answer:
          'Da. Echipa Olidental Clinic oferă un mediu sigur, lipsit de stres și de judecată, tratează fiecare pacient cu răbdare și îi explică pe îndelete fiecare procedură înainte de a o începe.',
      },
      {
        question: 'Se poate plăti tratamentul stomatologic în rate?',
        answer:
          'Da. Olidental Clinic îți recomandă parteneri de încredere care oferă opțiuni de creditare pentru eșalonarea plăților, ca să poți face tratamentele necesare fără presiune financiară.',
      },
      {
        question: 'Cum pot face o programare la Olidental Clinic?',
        answer:
          'Poți face o programare online, prin formularul de pe site, sau telefonic, la numărul 0733 023 030.',
        link: { href: '/programare', label: 'Programează-te online' },
      },
    ],
  },
];

export function getPostUrlPath(post) {
  return `${BLOG_PATH}/${post.slug}`;
}

export function getPostBySlug(slug) {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) {
    throw new Error(`Unknown blog post slug: "${slug}"`);
  }
  return post;
}

export function getAllPosts() {
  return [...blogPosts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getReadingMinutes(post) {
  return Math.max(1, Math.round(post.wordCount / WORDS_PER_MINUTE));
}

/** "2026-09-29" -> "29 septembrie 2026" (fixed month names, so server and
 * browser render the same text and hydration never mismatches). */
export function formatDateRo(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return `${day} ${MONTHS_RO[month - 1]} ${year}`;
}
