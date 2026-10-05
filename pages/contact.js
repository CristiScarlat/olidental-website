import Link from "next/link";
import Location from "../components/location";

const Contact = () => {
    return (
        <div id="contact">
            <h1 className="text-center pt-3">Contact Olidental Clinic Timișoara</h1>
            <p className="text-center m-auto pb-4" style={{ maxWidth: '40rem', color: '#807f89' }}>
                Cabinetul nostru se află pe Strada Ștefan cel Mare 53, la parter, cu intrare dinspre strada Gh. Asachi.
                Ne poți contacta telefonic, prin email sau direct printr-o{' '}
                <Link href="/programare">programare online</Link>. Suntem disponibili de luni până vineri, între 09:30 și 18:30.
            </p>
            <Location />
        </div>
    )
}

Contact.seo = {
    title: "Contact | Olidental Clinic Timișoara",
    description: "Adresa, telefonul și emailul clinicii stomatologice Olidental din Timișoara: Strada Ștefan cel Mare 53, +40 733.023.030, clinica@olidental.ro.",
    canonical: "https://olidental.ro/contact",
};

export default Contact;
