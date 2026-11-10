// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'protetica-implanturi',
  shortName: 'Protetică pe implanturi',
  name: 'Protetică pe implanturi',
  intro: 'În etapa protetică alegem componenta de legătură și coroana. Pentru un dinte complet, planul individual precizează implantul, componenta, coroana și etapele suplimentare necesare.',
  links: [
    { href: '/restaurari-protetice-dentare', label: 'Despre restaurările protetice pe implanturi' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Componentă pentru restaurare înșurubată, pe implant', lei: 530, eur: 100 },
        { name: 'Stâlp protetic provizoriu', lei: 265, eur: 50 },
        { name: 'Stâlp standard pentru implant', lei: 320, eur: 60 },
        { name: 'Stâlp hibrid individualizat', lei: 800, eur: 150 },
        { name: 'Coroană metalo-ceramică cimentată', lei: 1485, eur: 280 },
        { name: 'Coroană metalo-ceramică înșurubată', lei: 1645, eur: 310 },
        { name: 'Coroană metalo-compozit înșurubată, Timble', lei: 1645, eur: 310 },
        { name: 'Coroană înșurubată pe schelet placat din titan', lei: 2120, eur: 400 },
        { name: 'Coroană înșurubată din zirconiu monolitic', lei: 1800, eur: 340 },
        { name: 'Coroană înșurubată din zirconiu placat cu ceramică', lei: 1855, eur: 350 },
        { name: 'Coroană individuală din zirconiu monolitic pe stâlp individualizat, premill', lei: 2385, eur: 450 },
        { name: 'Coroană înșurubată din compozit Blender Multilayer', lei: 800, eur: 150 },
        { name: 'Coroană provizorie pe implant', lei: 320, eur: 60 },
        { name: 'Coroană provizorie de laborator CAD-CAM, de lungă durată, fără schelet', lei: 475, eur: 90 },
        { name: 'Coroană provizorie de laborator, de lungă durată, cu structură metalică', lei: 530, eur: 100 },
      ],
    },
  ],
};

export default category;
