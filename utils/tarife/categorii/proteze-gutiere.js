// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'proteze-gutiere',
  shortName: 'Proteze și gutiere',
  name: 'Proteze, lucrări telescopate și gutiere',
  intro: 'În funcție de situația clinică, opțiunile pot include proteze totale sau parțiale, supraproteze stabilizate pe implanturi și lucrări telescopate.',
  links: [
    { href: '/restaurari-protetice', label: 'Despre restaurările protetice' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Proteză totală cu dinți din acrilat', lei: 2915, eur: 550 },
        { name: 'Proteză totală cu dinți din compozit', lei: 3345, eur: 650 },
        { name: 'Proteză scheletată', lei: 6360, eur: 1200 },
        { name: 'Lucrare telescopată Galvano', lei: 18550, eur: 3500 },
        { name: 'Telescop Galvano', lei: 800, eur: 150 },
        { name: 'Telescop FGP', lei: 530, eur: 100 },
        { name: 'Supraproteză pe implanturi, cu bară și Locator', lei: 15900, eur: 3000 },
        { name: 'Supraproteză pe stâlpi Locator', lei: 13250, eur: 2500 },
        { name: 'Supraproteză pe capse', lei: 4240, eur: 800 },
        { name: 'Căptușire directă a protezei', lei: 800, eur: 150 },
        { name: 'Reparație proteză sau lucrare provizorie', lei: 530, eur: 100 },
        { name: 'Schimbarea garniturii unei proteze mobilizabile, pe element', lei: 210, eur: 40 },
        { name: 'Schimbarea matricei și a garniturii, pe element', lei: 370, eur: 70 },
        { name: 'Gutieră dublă pentru sforăit și apnee nocturnă, la indicație', lei: 1060, eur: 200 },
        { name: 'Gutieră pentru bruxism', lei: 370, eur: 70 },
      ],
    },
  ],
};

export default category;
