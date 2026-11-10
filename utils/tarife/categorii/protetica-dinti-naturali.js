// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'protetica-dinti-naturali',
  shortName: 'Protetică pe dinți naturali',
  name: 'Protetică pe dinți naturali',
  intro: 'Refacem dinții prin coroane, fațete și alte restaurări. Alegerea materialului ține de poziția dintelui, de câtă structură dentară poate fi păstrată și de rezultatul estetic urmărit.',
  links: [
    { href: '/restaurari-protetice', label: 'Despre restaurările protetice' },
    { href: '/fatete-coroane-ceramice', label: 'Despre fațete și coroane ceramice' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Coroană metalo-ceramică', lei: 1325, eur: 250 },
        { name: 'Coroană din zirconiu monolitic', lei: 1700, eur: 320 },
        { name: 'Coroană din zirconiu placat cu ceramică', lei: 1750, eur: 330 },
        { name: 'Coroană din compozit premium cu structură metalică', lei: 800, eur: 150 },
        { name: 'Restaurare individualizată integral ceramică cu fixare adezivă, inclusiv onlay conform grilei', lei: 2120, eur: 400 },
        { name: 'Coroană sau fațetă integral ceramică unică pe dinte frontal, cu fixare adezivă', lei: 3180, eur: 600 },
        { name: 'Coroană provizorie realizată în cabinet', lei: 160, eur: 30 },
        { name: 'Coroană provizorie de laborator', lei: 320, eur: 60 },
        { name: 'Coroană provizorie de laborator, de lungă durată, cu structură metalică', lei: 530, eur: 100 },
        { name: 'Scanare segmentară', lei: 210, eur: 40 },
        { name: 'Amprentă digitală prin scanare intraorală 3D', lei: 425, eur: 80 },
        { name: 'Cimentare pe dinte sau pe stâlp', lei: 100, eur: 20 },
        { name: 'Dispozitiv corono-radicular sinterizat în laborator', lei: 475, eur: 90 },
        { name: 'Îndepărtarea unei restaurări metalo-ceramice, pe element', lei: 160, eur: 30 },
        { name: 'Îndepărtarea unei restaurări integral ceramice sau din zirconiu, pe element', lei: 210, eur: 40 },
        { name: 'Refixarea unei restaurări desprinse', lei: 100, eur: 20 },
        { name: 'Wax-up, simulare pe model imprimat, pe arcadă', lei: 1060, eur: 200 },
        { name: 'Mock-up, simularea zâmbetului în gură, pe arcadă', lei: 800, eur: 150 },
        { name: 'Model de studiu, pe arcadă', lei: 210, eur: 40 },
      ],
    },
  ],
};

export default category;
