// Source: the clinic price list "tarife olidental med 2.docx" (received 2026-11-13).
// Names, prices, intros, notes and the closing text are the clinic's own words: keep them
// verbatim (tests/tarife compares them with tests/tarife/fixtures/clinic-document.json).
// Only `id`, `shortName` and `links` are written for the page.
//
// A price is `min`, plus `max` for a range ("65–110 €"), `from: true` for "de la 550 €",
// and `unit` for "€/dinte". All amounts are in euro: the document has no lei.
export const DOCUMENT_TITLE = 'Tarife Olidental Clinic';
export const DOCUMENT_SUBTITLE = 'Tratamente adaptate nevoilor dumneavoastră, cu un plan personalizat și costuri comunicate înainte de începerea tratamentului.';

export const CLOSING = {
  heading: 'Planul dumneavoastră de tratament',
  text: 'Tarifele afișate vă ajută să estimați bugetul tratamentului. Prețurile „de la” reprezintă tariful de pornire al serviciului indicat. După consultație și investigațiile necesare, veți primi un plan personalizat, cu etapele, serviciile incluse și costurile aferente, înainte de începerea tratamentului.',
  ctaLabel: 'Programează o consultație',
};

export const RAW_GROUPS = [
  {
    id: 'implantologie',
    shortName: 'Implantologie',
    name: 'Implantologie și dinți ficși',
    rows: [
      { name: 'Implant dentar cu inserare', from: true, min: 550, unit: 'implant' },
      { name: 'Dinți ficși pe 4 implanturi', min: 3500, unit: 'arcadă' },
      { name: 'Dinți ficși pe 6 implanturi', min: 4800, unit: 'arcadă' },
    ],
    note: 'Pachetele pe 4 și 6 implanturi includ: implanturile, componentele protetice, adiția osoasă, A-PRF și lucrarea fixă de lungă durată din compozit Blender, pe structură metalică.',
    links: [
      { href: '/implantologie', label: 'Despre implantologia orală' },
      { href: '/reabilitari-orale-complexe', label: 'Despre reabilitările orale complexe' },
    ],
  },
  {
    id: 'consultatii',
    shortName: 'Consultații',
    name: 'Consultații și diagnostic',
    intro: 'Evaluare, investigații și planificarea tratamentului.',
    rows: [
      { name: 'Consultație', min: 40 },
      { name: 'Consultație, radiografie panoramică, CBCT total și plan de tratament', min: 130 },
      { name: 'Radiografie panoramică', from: true, min: 20 },
      { name: 'Tomografie dentară CBCT', from: true, min: 50 },
    ],
    links: [
      { href: '/programare', label: 'Programează o consultație' },
    ],
  },
  {
    id: 'igienizare-estetica',
    shortName: 'Igienizare și estetică',
    name: 'Igienizare și estetică dentară',
    intro: 'Îngrijirea dinților și îmbunătățirea aspectului zâmbetului.',
    rows: [
      { name: 'Igienizare completă: detartraj, Air Flow și periaj', min: 80 },
      { name: 'Albire profesională, două arcade', min: 150, unit: 'ședință' },
      { name: 'Fațetă directă din compozit', min: 200, unit: 'dinte' },
    ],
    links: [
      { href: '/estetica-zambetului', label: 'Despre estetica zâmbetului' },
    ],
  },
  {
    id: 'carii-endodontie',
    shortName: 'Carii și endodonție',
    name: 'Tratamentul cariilor și endodonție',
    intro: 'Restaurarea dinților afectați de carii și tratamente de canal.',
    rows: [
      { name: 'Obturație estetică', min: 65, max: 110, unit: 'dinte' },
      { name: 'Tratament de canal cu reconstrucție', min: 160, max: 260, unit: 'dinte' },
      { name: 'Retratament de canal cu reconstrucție', min: 180, max: 280, unit: 'dinte' },
    ],
    links: [
      { href: '/echipa#ana-strava', label: 'Dr. Ana Strava, tratamente endodontice' },
    ],
  },
  {
    id: 'coroane-fatete',
    shortName: 'Coroane și fațete',
    name: 'Coroane, fațete și lucrări pe implanturi',
    intro: 'Restaurări adaptate cerințelor funcționale și estetice.',
    rows: [
      { name: 'Coroană metalo-ceramică pe dinte natural', min: 250, unit: 'dinte' },
      { name: 'Coroană din zirconiu pe dinte natural', min: 320, max: 330, unit: 'dinte' },
      { name: 'Restaurare integral ceramică, inclusiv onlay', min: 400, unit: 'dinte' },
      { name: 'Coroană înșurubată din zirconiu pe implant', min: 340, max: 350, unit: 'dinte' },
      { name: 'Lucrare fixă pe implanturi, pe structură metalică', min: 3880, unit: 'arcadă' },
      { name: 'Lucrare fixă pe implanturi, pe structură din titan', min: 4400, unit: 'arcadă' },
    ],
    note: 'Lucrările fixe pe arcadă includ 12–14 dinți din zirconiu sau compozit premium și gingie protetică; tarifele acestora se referă exclusiv la lucrarea protetică.',
    links: [
      { href: '/restaurari-protetice', label: 'Despre restaurările protetice' },
      { href: '/fatete-coroane-ceramice', label: 'Despre fațete și coroane ceramice' },
      { href: '/restaurari-protetice-dentare', label: 'Despre restaurările protetice pe implanturi' },
    ],
  },
  {
    id: 'chirurgie-parodontologie',
    shortName: 'Chirurgie și parodontologie',
    name: 'Chirurgie orală și parodontologie',
    intro: 'Intervenții pentru dinți, gingii și țesuturile de susținere.',
    rows: [
      { name: 'Extracție dentară', from: true, min: 50, unit: 'dinte' },
      { name: 'Extracție molar de minte', min: 100, max: 200, unit: 'dinte' },
      { name: 'Adiție osoasă', from: true, min: 300 },
      { name: 'Sinus lift', from: true, min: 300 },
      { name: 'Evaluare parodontală, ambele arcade', min: 60 },
      { name: 'Tratament parodontal prin chiuretaj', min: 300, max: 500, unit: 'arcadă' },
    ],
    note: 'Tariful intervențiilor depinde de procedura indicată. Materialele incluse sunt precizate în planul de tratament.',
    links: [
      { href: '/inserare-implant-aditii-os', label: 'Despre inserarea de implanturi și adițiile de os' },
    ],
  },
  {
    id: 'proteze-gutiere',
    shortName: 'Proteze și gutiere',
    name: 'Proteze dentare și gutiere',
    intro: 'Soluții pentru înlocuirea dinților lipsă și protejarea danturii.',
    rows: [
      { name: 'Proteză totală', min: 550, max: 650 },
      { name: 'Proteză scheletată', min: 1200 },
      { name: 'Supraproteză pe stâlpi Locator', min: 2500 },
      { name: 'Gutieră pentru bruxism', min: 70 },
    ],
    links: [
      { href: '/restaurari-protetice', label: 'Despre restaurările protetice' },
    ],
  },
  {
    id: 'ortodontie',
    shortName: 'Ortodonție',
    name: 'Ortodonție',
    intro: 'Tratamente pentru alinierea dinților și corectarea mușcăturii.',
    rows: [
      { name: 'Consultație ortodontică', min: 40 },
      { name: 'Aparat mobil', min: 280, unit: 'arcadă' },
      { name: 'Aparat fix metalic', min: 700, unit: 'arcadă' },
      { name: 'Aparat fix din safir', min: 1000, unit: 'arcadă' },
      { name: 'Control periodic aparat fix', min: 30, max: 50 },
    ],
    note: 'Controalele periodice, îndepărtarea aparatului și contenția se tarifează separat.',
    links: [
      { href: '/echipa#diana-rada-barsan', label: 'Dr. Diana Rada Bârsan, tratamente ortodontice' },
    ],
  },
  {
    id: 'stomatologie-copii',
    shortName: 'Copii',
    name: 'Stomatologie pentru copii',
    intro: 'Prevenție și tratamente pentru dinții temporari și permanenți.',
    rows: [
      { name: 'Consultație pentru copii', min: 40 },
      { name: 'Pachet de profilaxie sau igienizare', min: 60, max: 70 },
      { name: 'Sigilare dentară', min: 40, max: 50, unit: 'dinte' },
      { name: 'Obturație din compozit', min: 60, max: 80, unit: 'dinte' },
      { name: 'Extracție dinte temporar', min: 40, max: 50, unit: 'dinte' },
    ],
    links: [
      { href: '/echipa/anda-nicola', label: 'Dr. Anda Nicola, tratamente pedodontice' },
    ],
  },
];
