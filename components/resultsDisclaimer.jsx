// Disclaimer for pages that show before/after treatment photos (the
// /rezultate/* case galleries and /zambete), as distinct from the treatment
// description pages (see MedicalDisclaimer). Addresses a real audit finding:
// the site's highest-exposure medical imagery (84 before/after photo pairs)
// carried no "results vary by patient" qualifier anywhere.
const ResultsDisclaimer = () => (
  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
    Rezultatele prezentate sunt cazuri reale, tratate la Olidental Clinic. Rezultatele
    tratamentelor stomatologice variază de la un pacient la altul, în funcție de situația
    clinică individuală, și nu pot fi garantate în avans; ele se stabilesc doar în urma unui
    consult la cabinet.
  </p>
);

export default ResultsDisclaimer;
