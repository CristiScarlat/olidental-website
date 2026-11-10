// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'ortodontie',
  shortName: 'Ortodonție',
  name: 'Ortodonție',
  intro: 'Evaluăm poziția dinților și mușcătura, apoi discutăm aparatul potrivit, controalele și etapa de contenție. Tarifele precizează când se aplică pentru o singură arcadă.',
  links: [
    { href: '/echipa#diana-rada-barsan', label: 'Dr. Diana Rada Bârsan, tratamente ortodontice' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Consultație ortodontică inițială', lei: 210, eur: 40 },
        { name: 'Fotografii de diagnostic', lei: 160, eur: 30 },
        { name: 'Elaborarea și discutarea planului de tratament', lei: 0, eur: 0 },
        { name: 'Modele de studiu', lei: 210, eur: 40 },
        { name: 'Aparat mobil, pe arcadă', lei: 1480, eur: 280 },
        { name: 'Aparat fix cu brackeți metalici, pe arcadă', lei: 3710, eur: 700 },
        { name: 'Aparat fix cu brackeți din safir, pe arcadă', lei: 5530, eur: 1000 },
        { name: 'Activarea aparatului mobil', lei: 100, eur: 20 },
        { name: 'Control lunar aparat fix metalic, o arcadă', lei: 160, eur: 30 },
        { name: 'Control lunar aparat fix metalic, ambele arcade', lei: 265, eur: 50 },
        { name: 'Control lunar aparat fix estetic, o arcadă', lei: 160, eur: 30 },
        { name: 'Control lunar aparat fix estetic, ambele arcade', lei: 265, eur: 50 },
        { name: 'Îndepărtarea aparatului, pe arcadă', lei: 320, eur: 60 },
        { name: 'Refixare bracket metalic', lei: 160, eur: 30 },
        { name: 'Refixare bracket estetic', lei: 210, eur: 40 },
        { name: 'Reparație aparat mobil', lei: 210, eur: 40 },
        { name: 'Recimentare inel', lei: 100, eur: 20 },
        { name: 'Arc transpalatinal sau arc lingual', lei: 640, eur: 120 },
        { name: 'Disjunctor', lei: 1855, eur: 350 },
        { name: 'Menținător de spațiu fix', lei: 740, eur: 140 },
        { name: 'Gutieră de contenție', lei: 320, eur: 60 },
        { name: 'Contenție fixă, pe arcadă', lei: 320, eur: 60 },
        { name: 'Scut lingual', lei: 850, eur: 160 },
        { name: 'Bară transpalatinală Goshgarian', lei: 1270, eur: 240 },
      ],
    },
  ],
};

export default category;
