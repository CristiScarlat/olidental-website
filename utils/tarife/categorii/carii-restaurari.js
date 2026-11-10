// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'carii-restaurari',
  shortName: 'Carii și restaurări',
  name: 'Tratamentul cariilor și restaurări directe',
  intro: 'Refacem dinții afectați de carii sau de pierderea de substanță dentară. Tariful obturației diferă în funcție de amploarea restaurării.',
  links: [
    { href: '/programare', label: 'Programează o consultație' },
  ],
  cardPrices: [
    { name: 'Obturație estetică', lei: '350–580', eur: '65–110' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Obturație estetică simplă', lei: 350, eur: 65 },
        { name: 'Obturație estetică medie', lei: 475, eur: 90 },
        { name: 'Obturație estetică complexă', lei: 580, eur: 110 },
        { name: 'Fațetă directă din compozit, în zona frontală', lei: 1060, eur: 200 },
        { name: 'Tratament pentru sensibilitate dentară', lei: 100, eur: 20 },
        { name: 'Coafaj direct cu MTA sau material bioceramic', lei: 210, eur: 40 },
        { name: 'Tratament de urgență cu pansament calmant sau drenaj transdentar', lei: 265, eur: 50 },
      ],
    },
  ],
};

export default category;
