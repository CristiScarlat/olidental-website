// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'arcade-fixe-implanturi',
  shortName: 'Arcade fixe pe implanturi',
  name: 'Arcade fixe pe implanturi',
  intro: 'Pentru refacerea unei arcade, planul precizează numărul de implanturi, tipul lucrării și costul fiecărei etape. Mai jos sunt pachetele cu implanturi și opțiunile de restaurare protetică pe arcadă.',
  links: [
    { href: '/reabilitari-orale-complexe', label: 'Despre reabilitările orale complexe' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Arcadă fixă pe 4 implanturi, cu componente protetice, adiție osoasă, A-PRF și lucrare de lungă durată din compozit Blender pe structură metalică', lei: 18550, eur: 3500 },
        { name: 'Arcadă fixă pe 6 implanturi, cu componente protetice, adiție osoasă, A-PRF și lucrare de lungă durată din compozit Blender pe structură metalică', lei: 25440, eur: 4800 },
        { name: 'Lucrare fixă înșurubată pe arcadă, cu schelet metalic, 12–14 dinți din zirconiu sau compozit premium și gingie protetică', lei: 20560, eur: 3880 },
        { name: 'Lucrare fixă înșurubată pe arcadă, cu schelet din titan, 12–14 dinți din zirconiu sau compozit premium și gingie protetică', lei: 23320, eur: 4400 },
      ],
    },
  ],
};

export default category;
