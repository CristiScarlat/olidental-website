import Link from 'next/link';
import ArticleLayout from '../../components/blog/ArticleLayout';
import { getPostBySlug } from '../../utils/blogPosts';
import { buildPostSeo } from '../../utils/blogSchema';
import { GOOGLE_MAPS_URL } from '../../utils/schema';

const post = getPostBySlug('povestea-olidental-clinic');

const TEAM_IMAGE = {
  src: '/images/blog/povestea-olidental-clinic/echipa-1200.webp',
  srcSet:
    '/images/blog/povestea-olidental-clinic/echipa-800.webp 800w, /images/blog/povestea-olidental-clinic/echipa-1200.webp 1200w',
  width: 1200,
  height: 800,
};

// The article's H2s: `title` is the heading as written by the clinic,
// `label` its short form in the table of contents, `id` the link anchor.
const SECTIONS = {
  vision: { id: 'viziunea-dr-oli', title: 'Totul începe de la oameni: Viziunea Dr. Oli', label: 'Viziunea Dr. Oli' },
  experience: {
    id: 'confort-si-siguranta',
    title: 'Mai mult decât servicii medicale: O experiență definită de confort și siguranță',
    label: 'Confort și siguranță',
  },
  technology: { id: 'tehnologie', title: 'Tehnologie modernă și tehnici minim invazive', label: 'Tehnologie modernă' },
  quality: { id: 'calitate', title: 'Calitatea ca garanție și angajament', label: 'Calitatea ca angajament' },
  invitation: { id: 'te-asteptam', title: 'Te așteptăm să ne cunoaștem!', label: 'Te așteptăm' },
};

// Article text as written by the clinic (only a grammar fix and internal
// links added); "Pe scurt", FAQ, founder box and CTA come from ArticleLayout.
const PovesteaOlidentalClinic = () => (
  <ArticleLayout post={post} sections={Object.values(SECTIONS)}>
    <p>
      Există un moment în viața fiecăruia dintre noi când conștientizăm puterea unui zâmbet.
      Estetica este importantă. Însă un zâmbet frumos și sănătos ne oferă lucruri de neprețuit:
      starea de bine, libertatea de a râde fără rețineri și sănătatea întregului organism.
    </p>
    <p>
      Din această conștientizare și din dorința profundă de a schimba percepția asupra vizitei la
      dentist s-a născut Olidental Clinic – o clinică de stomatologie integrată în Timișoara.
    </p>

    <h2 id={SECTIONS.vision.id}>{SECTIONS.vision.title}</h2>
    <p>
      Cunoscut de pacienți modest, comunicativ și empatic, ca Dr. Oli, fondatorul clinicii noastre,{' '}
      <Link href="/echipa">Dr. Olimpiu Karancsi</Link>, a pornit la drum cu un obiectiv clar: să
      creeze un spațiu medical în care excelența profesională să meargă mână în mână cu a fi uman.
      Ca medic primar protetician și cadru didactic universitar, Dr. Oli a înțeles că stomatologia
      modernă înseamnă mult mai mult decât rezolvarea unei probleme dentare, oricât de dificilă sau
      simplă ar fi aceasta. Înseamnă armonie între funcționalitate, sănătate și aspect natural.
    </p>
    <blockquote>
      <p>
        „Mi-am dorit un loc în care oamenii să nu vină cu teamă, ci cu deschidere. Un loc în care
        fiecare pacient să simtă că este ascultat și că primește o soluție croită exact pe măsura
        nevoilor sale.”
      </p>
      <footer>
        — <cite>Dr. Olimpiu Karancsi</cite>
      </footer>
    </blockquote>
    <figure>
      <img
        src={TEAM_IMAGE.src}
        srcSet={TEAM_IMAGE.srcSet}
        sizes="(max-width: 800px) 100vw, 48rem"
        width={TEAM_IMAGE.width}
        height={TEAM_IMAGE.height}
        alt="Dr. Olimpiu Karancsi alături de colege din echipa Olidental Clinic, în uniforme gri"
        loading="lazy"
        decoding="async"
      />
      <figcaption>Dr. Oli (al doilea din stânga), alături de o parte din echipa Olidental Clinic.</figcaption>
    </figure>

    <h2 id={SECTIONS.experience.id}>{SECTIONS.experience.title}</h2>
    <p>
      Pășind în clinica Olidental, primul lucru pe care îl remarci este atmosfera liniștitoare. Știm
      că experiențele neplăcute din trecut îi fac pe mulți oameni să amâne vizita la stomatolog.
      Știm că frica îi ține departe de dentist. Știm că, uneori, mersul la dentist nu e o
      prioritate. Știm că unii nu se simt în largul lor dezvăluindu-și dantura. Tocmai de aceea, am
      încercat să creăm un mediu primitor și plin de înțelegere, în care siguranța și confortul sunt
      pilonii noștri fundamentali.
    </p>
    <p>
      Pacienții noștri menționează adesea în{' '}
      <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">recenzii</a> atenția,
      răbdarea și căldura cu care sunt întâmpinați. De la prima consultație până la finalizarea
      tratamentului, fiecare etapă este explicată pe înțelesul tuturor. Fără grabă, fără
      incertitudini, fără proceduri inutile, fără judecată.
    </p>

    <h2 id={SECTIONS.technology.id}>{SECTIONS.technology.title}</h2>
    <p>
      Medicina dentară a evoluat spectaculos în ultimii ani, iar la Olidental îmbrățișăm inovația la
      fiecare pas. Folosim echipamente de ultimă generație și tehnici minim invazive pentru ca
      fiecare intervenție să fie cât mai ușoară, precisă și lipsită de disconfort pentru pacienții
      noștri. Iar <Link href="/rezultate">rezultatele</Link> să fie pe măsură.
    </p>
    <p>
      Fie că vorbim despre{' '}
      <Link href="/reabilitari-orale-complexe">reabilitări estetice complexe</Link>,{' '}
      <Link href="/implantologie">implantologie</Link>,{' '}
      <Link href="/restaurari-protetice">protetică dentară</Link>,{' '}
      <Link href="/estetica-zambetului">estetică dentară</Link>, ortodonție sau igienizări
      periodice, punem accent pe naturalețe și pe unicitatea fiecărui pacient.
    </p>

    <h2 id={SECTIONS.quality.id}>{SECTIONS.quality.title}</h2>
    <p>
      Suntem convinși că un zâmbet frumos trebuie să fie, înainte de toate, un zâmbet sănătos și
      rezistent în timp. De aceea, rigoarea actului medical și selecția strictă a materialelor
      folosite sunt reguli de la care nu ne abatem niciodată.
    </p>
    <p>
      Pentru noi, satisfacția pacientului care se privește în oglindă la finalul tratamentului este
      cea mai valoroasă carte de vizită. Iar gândul că am contribuit la redobândirea încrederii în
      sine și la schimbarea într-o oarecare măsură a vieții acestuia constituie motivul pentru care,
      zi de zi, ne facem meseria cu aceeași pasiune.
    </p>

    <h2 id={SECTIONS.invitation.id}>{SECTIONS.invitation.title}</h2>
    <p>
      Dacă îți dorești o îngrijire stomatologică personalizată, realizată cu grijă, profesionalism și
      respect pentru timpul și confortul tău, te invităm să{' '}
      <Link href="/programare">faci primul pas</Link>.
    </p>
    <p>Echipa Olidental Clinic este pregătită să îți redea bucuria de a zâmbi!</p>
  </ArticleLayout>
);

PovesteaOlidentalClinic.seo = buildPostSeo(post);

export default PovesteaOlidentalClinic;
