// Standard medical-content disclaimer, shared across all treatment pages.
// Addresses two real audit findings: zero disclaimer anywhere on a YMYL
// (medical) site, and unqualified guarantee-style language elsewhere in the
// copy ("Reviewed/authored by" pairs with this — see `DoctorAttribution`).
const MedicalDisclaimer = () => (
  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1.5rem' }}>
    Informațiile de pe această pagină au scop informativ general și nu înlocuiesc o
    consultație medicală. Planul de tratament potrivit poate fi stabilit doar în urma unui
    consult la cabinet, în funcție de situația clinică reală a fiecărui pacient.
  </p>
);

export default MedicalDisclaimer;
