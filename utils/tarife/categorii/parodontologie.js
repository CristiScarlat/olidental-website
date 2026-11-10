// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'parodontologie',
  shortName: 'Parodontologie',
  name: 'Parodontologie',
  intro: 'Evaluăm gingiile și țesuturile care susțin dinții. Planul poate include tratament local, intervenții parodontale și reevaluări periodice.',
  links: [
    { href: '/programare', label: 'Programează o consultație' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Evaluare și fișă parodontală, ambele arcade', lei: 320, eur: 60 },
        { name: 'Reevaluare parodontală, ambele arcade', lei: 210, eur: 40 },
        { name: 'Imobilizare parodontală cu fibră de sticlă sau metal', lei: 425, eur: 80 },
        { name: 'Chiuretaj parodontal în câmp închis (SRP), pe arcadă', lei: 1590, eur: 300 },
        { name: 'Chiuretaj parodontal în câmp deschis, pe arcadă', lei: 2650, eur: 500 },
        { name: 'Chiuretaj parodontal, pe dinte', lei: 210, eur: 40 },
        { name: 'Tratament medicamentos parodontal', lei: 85, eur: 16 },
        { name: 'Alungire coronară în scop protetic sau estetic, pe arcadă', lei: 2120, eur: 400 },
        { name: 'Alungire coronară în scop protetic sau estetic, pe dinte', lei: 210, eur: 40 },
      ],
    },
  ],
};

export default category;
