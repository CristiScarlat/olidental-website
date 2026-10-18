// Extra content for the doctors who have their own page at /echipa/<slug>
// (pages/echipa/*.js), keyed by `teamCards` title (utils/uiConstants.js).
// The bio, specializations and services shown on those pages come from
// teamCards, unchanged. Everything below is public information checked on
// 2026-10-18 against the source named next to it; the full research notes
// are in ~/Olidental/cercetare-medici-2026-10-18.md.

const UMFT = 'UMF „Victor Babeș” Timișoara';

const KARANCSI_UMFT_PAGE =
  'https://www.umft.ro/ro/facultati/fmd_facultatea-de-medicina-dentara/departamente-facultatea-de-medicina-dentara/departamentul-iii/reabilitare-protetica-si-implante/';
const KARANCSI_LINKEDIN = 'https://www.linkedin.com/in/dr-olimpiu-karancsi-09a98aa4/';
const KARANCSI_OPENALEX = 'https://openalex.org/A5023394374';
const TADERP_PAGE = 'https://www.umft.ro/en/research-centres/taderp/';
const DERBAN_FACEBOOK = 'https://www.facebook.com/people/Dr-Paula-Derban-medic-primar-Protetica-Dentara/100085653649769/';
const DERBAN_OPENALEX = 'https://openalex.org/A5000878099';

// Co-written by Dr. Karancsi and Dr. Derban (UMFT publishing house report, 08.2025).
const IMPLANTOLOGY_TEXTBOOK = {
  title: 'Implantologie orală și restaurări protetice cu sprijin implantar',
  details: 'Bratu, Karancsi, Topală, Derban · Editura Victor Babeș · ISBN 978-606-786-007-8',
};

export const DOCTOR_PROFILES = {
  'Dr. Olimpiu Ladislau Karancsi': {
    shortName: 'Dr. Olimpiu Karancsi',
    // His bio: "Dr. Oli, cum este cunoscut de pacienți". Used only in the
    // page title and as the Person's alternateName, not shown as its own line.
    nickname: 'Dr. Oli',
    eyebrow: 'Fondatorul Olidental Clinic',
    role: 'Protetică dentară, chirurgie dento-alveolară și implantologie orală',
    intro: `Medic la Olidental Clinic din Timișoara, clinica pe care a fondat-o în 2015, și șef de lucrări la Facultatea de Medicină Dentară a ${UMFT}.`,
    seo: {
      title: 'Dr. Olimpiu Karancsi (Dr. Oli), medic stomatolog Timișoara',
      description:
        'Dr. Olimpiu Karancsi, fondatorul Olidental Clinic Timișoara: protetică dentară, chirurgie dento-alveolară, implantologie orală. Șef de lucrări la UMF Timișoara.',
    },
    highlights: [
      { value: '2015', label: 'a fondat Olidental Clinic' },
      { value: 'Șef de lucrări', label: UMFT },
      { value: '3', label: 'cărți de specialitate, ca coautor' },
    ],
    // Quoted in his bio.
    quote: 'Nu există probleme, ci doar soluții!',
    // UMFT staff page ("Șef Lucrări Dr.") and the TADERP members list
    // ("Senior Lecturer, DMD, PhD"). The lecturer post itself is already in
    // his specializations; the staff page is linked under "Profiluri publice".
    academicTitle: 'Activitate universitară și de cercetare',
    academic: [
      { text: 'Doctor în științe medicale' },
      {
        text: `Membru al centrului de cercetare TADERP (tehnici digitale și avansate în tratamentul endodontic, restaurator și protetic), ${UMFT}`,
        href: TADERP_PAGE,
      },
    ],
    books: [
      {
        title: 'Tehnologia restaurărilor protetice cu sprijin implantar',
        details: 'Bratu, Karancsi, Sita · Editura Nagard, 2007 · ISBN 978-973-673-089-4',
      },
      IMPLANTOLOGY_TEXTBOOK,
      {
        title: 'Principii de tratament ortodontic interdisciplinar',
        details: 'Editura Mirton, 2017 · coautor',
      },
    ],
    // PubMed records, checked through the NCBI E-utilities.
    articles: [
      {
        title: 'Implant survival rate and marginal bone loss of 6-mm short implants: a 2-year clinical report',
        details: 'The International Journal of Oral & Maxillofacial Implants, 2014',
        href: 'https://pubmed.ncbi.nlm.nih.gov/25397805/',
      },
      {
        title: 'Internal Hexagon vs Conical Implant-Abutment Connections: Evaluation of 3-Year Postloading Outcomes',
        details: 'Journal of Oral Implantology, 2021',
        href: 'https://pubmed.ncbi.nlm.nih.gov/33270835/',
      },
    ],
    // Co-authored with Prof. Emanuel Bratu (profemanuelbratu.ro/cv).
    conferences: [
      'Congresul internațional DGOI, München (2004 și 2008)',
      'ICOI World Congress, Strasbourg (2005)',
      'Update Implantologie, Heidelberg (2005 și 2006)',
      'Congresul UNAS, București (2003 și 2004)',
      'Congresul S.R.I.O.B., București (2008)',
    ],
    conferencesTitle: 'Lucrări prezentate la congrese de implantologie (coautor)',
    profiles: [
      { label: 'Pagina UMF Timișoara', href: KARANCSI_UMFT_PAGE },
      { label: 'LinkedIn', href: KARANCSI_LINKEDIN },
      { label: 'Lucrări științifice (OpenAlex)', href: KARANCSI_OPENALEX },
    ],
    sameAs: [KARANCSI_LINKEDIN, KARANCSI_OPENALEX],
  },

  'Dr. Paula Derban': {
    shortName: 'Dr. Paula Derban',
    eyebrow: 'Protetică dentară',
    role: 'Protetică dentară, implantologie orală și estetică dentară',
    intro: 'Medic la Olidental Clinic din Timișoara, unde se ocupă de protetică dentară, implantologie orală și estetică dentară.',
    seo: {
      title: 'Dr. Paula Derban, protetică dentară Timișoara | Olidental',
      description:
        'Dr. Paula Derban, medic la Olidental Clinic Timișoara: protetică dentară, implantologie orală și estetică dentară, cu 17 ani de experiență în stomatologie.',
    },
    highlights: [
      { value: '17 ani', label: 'de experiență în stomatologie' },
      { value: 'Coautor', label: 'manual de implantologie orală' },
      { value: '2021', label: 'articol în revista Materials' },
    ],
    // UMFT teaching staff list of 16.11.2016, discipline "Rest. prot. impl.".
    academicTitle: 'Activitate universitară',
    academic: [
      { text: `A făcut parte din personalul didactic al disciplinei Restaurări protetice pe implante, ${UMFT} (2016)` },
    ],
    books: [IMPLANTOLOGY_TEXTBOOK],
    articles: [
      {
        title:
          'Influence of the Printing Angle and Load Direction on Flexure Strength in 3D Printed Materials for Provisional Dental Restorations',
        details: 'Materials, 2021 · prim autor',
        href: 'https://pubmed.ncbi.nlm.nih.gov/34207167/',
      },
    ],
    profiles: [{ label: 'Pagina de Facebook', href: DERBAN_FACEBOOK }],
    sameAs: [DERBAN_FACEBOOK, DERBAN_OPENALEX],
  },

  'Dr. Anda Nicola': {
    shortName: 'Dr. Anda Nicola',
    eyebrow: 'Stomatologie pediatrică',
    role: 'Stomatologie pediatrică (pedodonție)',
    intro: 'Medic la Olidental Clinic din Timișoara, unde se ocupă exclusiv de stomatologia copiilor.',
    seo: {
      title: 'Dr. Anda Nicola, stomatolog copii Timișoara | Olidental',
      description:
        'Dr. Anda Nicola se ocupă exclusiv de stomatologia copiilor la Olidental Clinic Timișoara. Medic dentist cu peste 20 de ani de experiență.',
    },
    highlights: [
      { value: '20+ ani', label: 'de experiență ca medic dentist' },
      { value: 'Exclusiv', label: 'stomatologie pentru copii' },
      { value: 'UMF Timișoara', label: 'absolventă, Medicină Dentară' },
    ],
    // Her profile on a former employer's site (DENT ESTET 4 KIDS, archived 17.04.2016).
    academicTitle: 'Studii',
    academic: [{ text: `Absolventă a Facultății de Medicină Dentară, ${UMFT}` }],
    conferences: [
      'Diplomă EZ PEDO Certified Provider for Paediatric Zirconia Crowns, București (iunie 2015)',
      'Hands-on Cosmedent, curs susținut de Prof. Dr. Bennett Cochran, București (2015)',
      'Curs „Hygenic dental dam – A dry path to success” (martie 2015)',
      'Congres E.A.P.D. – Updates in pediatric dentistry, București (noiembrie 2014)',
      'Curs „Endodonție non-chirurgicală, noi standarde terapeutice”, Prof. Arnaldo Castellucci (Italia)',
      `Curs de parodontologie clinică, disciplina de Parodontologie, ${UMFT}`,
      'Simpozion de estetică dentară 3M ESPE',
      'Congresul „Zilele Medicale Bănățene, Medicina Mileniului III”',
      'Simpozion de prevenție dentară GlaxoSmithKline',
    ],
    conferencesTitle: 'Cursuri și congrese',
    // Her alumniOf is added in utils/schema.js (PERSON_EXTRAS).
    profiles: [],
    sameAs: [],
  },
};

// Treatment pages for the service names used in `teamCards`. Services with
// no page of their own (e.g. "Chirurgie orală") are shown without a link.
export const SERVICE_PAGE_LINKS = {
  'Estetica zâmbetului': '/estetica-zambetului',
  'Estetica dentară': '/estetica-zambetului',
  'Implantologie orală': '/implantologie',
  'Reabilitări orale complexe': '/reabilitari-orale-complexe',
  'Restaurări protetice estetice': '/restaurari-protetice',
  'Protetică dentară': '/restaurari-protetice',
  'Protetică dentară și implantologică': '/restaurari-protetice-dentare',
};
