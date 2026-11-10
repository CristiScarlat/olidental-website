// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'consultatii',
  shortName: 'Consultații',
  name: 'Consultații, imagistică și plan de tratament',
  intro: 'Începem cu o evaluare și stabilim ce investigații sunt necesare. În funcție de caz, puteți alege o consultație sau un pachet de diagnostic și planificare.',
  links: [
    { href: '/programare', label: 'Programează o consultație' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Consultație', lei: 210, eur: 40 },
        { name: 'Consultație, radiografie panoramică, CBCT total și plan de tratament', lei: 690, eur: 130 },
        { name: 'Pachet estetic cu fotografii, simulare digitală și wax-up imprimat 3D, pe arcadă', lei: 800, eur: 150 },
        { name: 'Fotografii de diagnostic', lei: 160, eur: 30 },
        { name: 'Simulare digitală și wax-up imprimat 3D, pe arcadă', lei: 800, eur: 150 },
        { name: 'CBCT total', lei: 475, eur: 90 },
        { name: 'CBCT segmentar', lei: 265, eur: 50 },
        { name: 'Radiografie panoramică', lei: 100, eur: 20 },
        { name: 'CBCT total pentru pacienți din afara clinicii', lei: 580, eur: 110 },
        { name: 'CBCT segmentar pentru pacienți din afara clinicii', lei: 370, eur: 70 },
        { name: 'Radiografie panoramică pentru pacienți din afara clinicii', lei: 160, eur: 30 },
      ],
    },
  ],
};

export default category;
