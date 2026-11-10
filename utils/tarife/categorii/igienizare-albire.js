// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'igienizare-albire',
  shortName: 'Igienizare și albire',
  name: 'Igienizare și albire dentară',
  intro: 'Igienizarea profesională îndepărtează depunerile de pe dinți. Pentru albire, medicul vă explică ce variantă se potrivește situației dumneavoastră.',
  links: [
    { href: '/programare', label: 'Programează o consultație' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Igienizare completă cu detartraj, Air Flow și periaj', lei: 425, eur: 80 },
        { name: 'Igienizare profesională parțială', lei: 320, eur: 60 },
        { name: 'Igienizarea lucrărilor mobilizabile', lei: 265, eur: 50 },
        { name: 'Înlocuirea sigiliului de acces al unei lucrări pe implant, pe element', lei: 100, eur: 20 },
        { name: 'Albire profesională pe două arcade, pe ședință, maximum 3 ședințe', lei: 800, eur: 150 },
        { name: 'Albire profesională pe o arcadă, pe ședință, maximum 3 ședințe', lei: 425, eur: 80 },
        { name: 'Albire dentară, pe dinte', lei: 100, eur: 20 },
      ],
    },
  ],
};

export default category;
