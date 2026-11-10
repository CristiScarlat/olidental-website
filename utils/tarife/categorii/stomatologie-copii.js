// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'stomatologie-copii',
  shortName: 'Stomatologie pentru copii',
  name: 'Stomatologie pentru copii',
  intro: 'Consultații, prevenție și tratamente pentru dinții de lapte și cei permanenți. La consultație, le explicăm părinților ce are nevoie copilul acum și ce urmărim la controalele următoare.',
  links: [
    { href: '/echipa/anda-nicola', label: 'Dr. Anda Nicola, tratamente pedodontice' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Consultație pedodontică', lei: 210, eur: 40 },
        { name: 'Igienizare pentru copii cu periaj, Air Flow și fluorizare', lei: 370, eur: 70 },
        { name: 'Profilaxie pentru copii cu periaj și fluorizare', lei: 320, eur: 60 },
        { name: 'Periaj profesional', lei: 210, eur: 40 },
        { name: 'Fluorizare cu gel', lei: 210, eur: 40 },
        { name: 'Evidențierea plăcii bacteriene', lei: 160, eur: 30 },
        { name: 'Sigilare dinte permanent', lei: 265, eur: 50 },
        { name: 'Sigilare dinte temporar', lei: 210, eur: 40 },
        { name: 'Obturație din compozit, 2 suprafețe', lei: 370, eur: 70 },
        { name: 'Obturație din compozit, 3 suprafețe', lei: 425, eur: 80 },
        { name: 'Obturație din compozit colorat', lei: 320, eur: 60 },
        { name: 'Obturație din compozit, dinte permanent', lei: 370, eur: 70 },
        { name: 'Obturație din compozit, dinte temporar', lei: 320, eur: 60 },
        { name: 'Obturație cu ionomer de sticlă', lei: 265, eur: 50 },
        { name: 'Obturație provizorie', lei: 160, eur: 30 },
        { name: 'Reconstrucție coronară din compozit', lei: 370, eur: 70 },
        { name: 'Protecție pulpară cu ionomer', lei: 210, eur: 40 },
        { name: 'Coafaj direct sau indirect', lei: 210, eur: 40 },
        { name: 'Tratament medicamentos pe canal', lei: 265, eur: 50 },
        { name: 'Pansament calmant', lei: 160, eur: 30 },
        { name: 'Drenaj', lei: 210, eur: 40 },
        { name: 'Incizie și drenaj', lei: 210, eur: 40 },
        { name: 'Extracție dinte mobil', lei: 210, eur: 40 },
        { name: 'Extracție dinte temporar fără resorbția rădăcinii', lei: 265, eur: 50 },
        { name: 'Decapușonare', lei: 265, eur: 50 },
        { name: 'Frenectomie', lei: 320, eur: 60 },
        { name: 'Gingivectomie', lei: 265, eur: 50 },
        { name: 'Chistectomie', lei: 640, eur: 120 },
        { name: 'Trainer', lei: 1270, eur: 240 },
        { name: 'Tratament de urgență în caz de traumatism', lei: 320, eur: 60 },
      ],
    },
  ],
};

export default category;
