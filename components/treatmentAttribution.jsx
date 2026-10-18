import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPageDate } from '../utils/pageDates';
import { formatDateRo } from '../utils/formatDate';

// Addresses "zero author/doctor attribution on treatment pages" — links each
// treatment page to the real, credentialed team rather than naming one
// specific doctor per page (which nobody has confirmed authored/reviewed
// that exact page — asserting that without verification would be a
// fabricated medical-authorship claim, not a fix).
// The visible update date reads the same utils/pageDates.js entry as the
// layout's og:updated_time, the JSON-LD dateModified and the sitemap lastmod,
// so all four always agree. Its <time> also gives date extractors (htmldate)
// a date when the meta tag is missing. The label sits inside <time> because
// trafilatura drops <time> with its text: outside, "Ultima actualizare:"
// would be left dangling in the extracted text.
const TreatmentAttribution = () => {
  const { pathname } = useRouter();
  const updatedOn = getPageDate(pathname);

  return (
    <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
      Conținut medical realizat de echipa Olidental Clinic.{' '}
      <Link href="/echipa">Vezi echipa și specializările noastre</Link>.
      <br />
      <time dateTime={updatedOn}>{`Ultima actualizare: ${formatDateRo(updatedOn)}`}</time>
    </p>
  );
};

export default TreatmentAttribution;
