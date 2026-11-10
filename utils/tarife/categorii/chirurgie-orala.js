// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'chirurgie-orala',
  shortName: 'Chirurgie orală',
  name: 'Chirurgie orală',
  intro: 'De la extracții la inserarea implanturilor, stabilim intervențiile în funcție de evaluarea clinică și de lucrarea planificată.',
  links: [
    { href: '/inserare-implant-aditii-os', label: 'Despre inserarea de implanturi și adițiile de os' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Extracție dinte monoradicular', lei: 265, eur: 50 },
        { name: 'Extracție dinte pluriradicular', lei: 425, eur: 80 },
        { name: 'Extracție molar de minte', lei: 530, eur: 100 },
        { name: 'Extracție molar de minte inclus', lei: 1060, eur: 200 },
        { name: 'Extracție parțială cu păstrarea unei porțiuni din rădăcină', lei: 640, eur: 120 },
        { name: 'Decapușonare molar de minte', lei: 265, eur: 50 },
        { name: 'Extracție rest radicular', lei: 210, eur: 40 },
        { name: 'Adiție osoasă după extracție', lei: 1590, eur: 300 },
        { name: 'Adiție osoasă laterală', lei: 2650, eur: 500 },
        { name: 'Rezecție apicală', lei: 1060, eur: 200 },
        { name: 'Sinus lift intern, manoperă', lei: 1590, eur: 300 },
        { name: 'Sinus lift extern, manoperă și material conform grilei', lei: 5300, eur: 1000 },
        { name: 'A-PRF, recoltare de sânge', lei: 530, eur: 100 },
      ],
    },
  ],
};

export default category;
