import Link from "next/link";
import Location from "../components/location";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "../utils/clinicContact";

const INTRO_STYLE = { maxWidth: '40rem', color: '#807f89' };

const Contact = () => {
    return (
        <div id="contact">
            <h1 className="text-center pt-3">Contact Olidental Clinic Timișoara</h1>
            <p className="text-center m-auto px-3 pb-2" style={INTRO_STYLE}>
                Cabinetul nostru se află pe Strada Ștefan cel Mare 53, la parter, cu intrare dinspre strada Gh. Asachi.
                Ne poți contacta telefonic, prin email sau direct printr-o{' '}
                <Link href="/programare">programare online</Link>. Suntem disponibili de luni până vineri, între 09:30 și 18:30.
            </p>
            {/* Phone and email as text in the main content too: text extractors
                (search engines, AI answers) drop the icon contact block below.
                Below 768px each item gets its own line and the "·" is hidden, so
                it never dangles at the end of a wrapped line. No aria-hidden on
                the "·": trafilatura drops aria-hidden text and would then glue
                the phone number to "Email:". */}
            <p className="text-center m-auto px-3 pb-4" style={INTRO_STYLE}>
                <span className="text-nowrap d-block d-md-inline">Telefon: <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></span>
                <span className="d-none d-md-inline">{' · '}</span>
                <span className="text-nowrap d-block d-md-inline">Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            </p>
            <Location />
        </div>
    )
}

Contact.seo = {
    title: "Contact | Olidental Clinic Timișoara",
    description: `Adresa, telefonul și emailul clinicii stomatologice Olidental din Timișoara: Strada Ștefan cel Mare 53, ${PHONE_DISPLAY}, ${EMAIL}.`,
    canonical: "https://olidental.ro/contact",
};

export default Contact;
