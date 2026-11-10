// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'implantologie',
  shortName: 'Implantologie',
  name: 'Implantologie',
  intro: 'Tariful implantului de mai jos acoperă implantul și inserarea lui. Componentele și coroanele sunt afișate în secțiunea „Protetică pe implanturi”.',
  links: [
    { href: '/implantologie', label: 'Despre implantologia orală' },
  ],
  blocks: [
    {
      type: 'featured',
      items: [
        { name: 'Implant dentar cu inserare', lei: 3180, eur: 600, unit: 'implant', prefix: 'De la', onCard: true },
      ],
    },
    {
      type: 'table',
      rows: [
        { name: 'Descoperirea implantului, când este indicată', lei: 210, eur: 40 },
        { name: 'Îndepărtarea unui implant', lei: 800, eur: 150 },
      ],
    },
    { type: 'note', text: 'Tariful variază în funcție de sistemul implantar ales. Componentele protetice și coroana se tarifează separat.' },
    {
      type: 'featured',
      title: 'Dinți ficși pe implanturi',
      items: [
        { name: 'Dinți ficși pe 4 implanturi', lei: 18550, eur: 3500, unit: 'arcadă', onCard: true, includes: 'Include lucrarea fixă de lungă durată din compozit Blender, pe structură metalică. Pachetul cuprinde și cele 4 implanturi, componentele protetice, adiția osoasă și A-PRF.' },
        { name: 'Dinți ficși pe 6 implanturi', lei: 25440, eur: 4800, unit: 'arcadă', onCard: true, includes: 'Include lucrarea fixă de lungă durată din compozit Blender, pe structură metalică. Pachetul cuprinde și cele 6 implanturi, componentele protetice, adiția osoasă și A-PRF.' },
      ],
      cta: [
        { label: 'Află cum decurge tratamentul', href: '/implantologie' },
        { label: 'Programează o consultație', href: '/programare' },
      ],
    },
    {
      type: 'table',
      title: 'Lucrări protetice fixe pe implanturi',
      intro: 'Lucrări înșurubate pentru o arcadă, cu 12–14 dinți din zirconiu sau compozit premium și gingie protetică.',
      priceHeader: 'Tarif pe arcadă',
      rows: [
        { name: 'Lucrare fixă pe structură metalică', lei: 20560, eur: 3880, unit: 'arcadă' },
        { name: 'Lucrare fixă pe structură din titan', lei: 23320, eur: 4400, unit: 'arcadă' },
      ],
      note: 'Tarifele din acest tabel se referă la lucrarea protetică. Dacă aceasta face parte dintr-un tratament mai amplu, costul total este detaliat în planul personalizat.',
    },
  ],
};

export default category;
