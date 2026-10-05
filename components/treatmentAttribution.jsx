import Link from 'next/link';

// Addresses "zero author/doctor attribution on treatment pages" — links each
// treatment page to the real, credentialed team rather than naming one
// specific doctor per page (which nobody has confirmed authored/reviewed
// that exact page — asserting that without verification would be a
// fabricated medical-authorship claim, not a fix).
const TreatmentAttribution = () => (
  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
    Conținut medical realizat de echipa Olidental Clinic.{' '}
    <Link href="/echipa">Vezi echipa și specializările noastre</Link>.
  </p>
);

export default TreatmentAttribution;
