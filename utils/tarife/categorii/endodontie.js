// Source: the clinic price list "tarife olidental.docx" (received 2026-11-10).
// Wording and numbers are the clinic's own: keep them verbatim.
const category = {
  id: 'endodontie',
  shortName: 'Endodonție',
  name: 'Endodonție',
  intro: 'Tratăm canalele radiculare și refacem partea vizibilă a dintelui. Tarifele de mai jos precizează când reconstrucția este inclusă.',
  links: [
    { href: '/echipa#ana-strava', label: 'Dr. Ana Strava, tratamente endodontice' },
  ],
  blocks: [
    {
      type: 'table',
      rows: [
        { name: 'Tratament de canal cu reconstrucție, incisiv sau canin', lei: 850, eur: 160 },
        { name: 'Tratament de canal cu reconstrucție, premolar', lei: 1060, eur: 200 },
        { name: 'Tratament de canal cu reconstrucție, molar', lei: 1380, eur: 260 },
        { name: 'Retratament de canal cu reconstrucție, incisiv sau canin', lei: 950, eur: 180 },
        { name: 'Retratament de canal cu reconstrucție, premolar', lei: 1170, eur: 220 },
        { name: 'Retratament de canal cu reconstrucție, molar', lei: 1480, eur: 280 },
        { name: 'Refacerea pereților dintelui înainte de tratamentul de canal', lei: 320, eur: 60 },
        { name: 'Sondaj explorator', lei: 210, eur: 40 },
        { name: 'Tratament medicamentos endodontic, dinte monoradicular', lei: 265, eur: 50 },
        { name: 'Tratament medicamentos endodontic, 2 canale', lei: 320, eur: 60 },
        { name: 'Tratament medicamentos endodontic, 3–4 canale', lei: 475, eur: 90 },
        { name: 'Îndepărtarea unui instrument fracturat', lei: 425, eur: 80 },
        { name: 'Îndepărtarea unui pivot din fibră', lei: 425, eur: 80 },
        { name: 'Îndepărtarea unui pivot Dentatus', lei: 320, eur: 60 },
        { name: 'Aplicare MTA pentru perforație sau dop apical', lei: 320, eur: 60 },
        { name: 'Pregătire endodontică pentru dispozitiv corono-radicular (DCR)', lei: 265, eur: 50 },
        { name: 'Reconstrucție adezivă a bontului, fără pivot', lei: 370, eur: 70 },
        { name: 'Reconstrucție adezivă cu pivot sau DCR sinterizat de laborator', lei: 475, eur: 90 },
        { name: 'Reconstrucție anatoformă după tratamentul de canal', lei: 530, eur: 100 },
      ],
    },
  ],
};

export default category;
