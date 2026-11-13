import Link from 'next/link';
import ArticleLayout from '../../components/blog/ArticleLayout';
import { getPostBySlug } from '../../utils/blogPosts';
import { buildPostSeo } from '../../utils/blogSchema';

const post = getPostBySlug('calendarul-zambetului-de-mireasa');

// The article's H2s: `title` is the heading as written by the clinic,
// `label` its short form in the table of contents, `id` the link anchor.
const SECTIONS = {
  oneYear: { id: '1-an-pana-la-nunta', title: '1 An până la nuntă', label: '1 an până la nuntă' },
  sixMonths: { id: '6-luni-pana-la-nunta', title: '6 Luni până la nuntă', label: '6 luni până la nuntă' },
  threeMonths: { id: '3-luni-pana-la-nunta', title: '3 Luni până la nuntă', label: '3 luni până la nuntă' },
  oneMonth: { id: '1-luna-pana-la-nunta', title: '1 Lună până la nuntă', label: '1 lună până la nuntă' },
  recommendation: {
    id: 'recomandarea-echipei',
    title: 'Recomandarea echipei Olidental Clinic',
    label: 'Recomandarea echipei',
  },
};

// Article text as written by the clinic (email of 2026-11-12). The paste we
// received lost a few fragments; each repair below is marked RECONSTRUCTED and
// listed for the clinic to confirm against the original before go-live:
//   1. intro, 3rd paragraph: "tratamentele stomatologice [...]ualizat de echipa";
//   2. 1 an, implants bullet: "Înlocuirea dinților [...] timp pentru osteointegrare";
//   3. 6 luni, orthodontic bullet: "ajustăm deta[...]" (end of the bullet);
//   4. the heading "3 Luni până la nuntă" (rebuilt from the title and the
//      other three headings; its text was lost in the paste);
//   5. 1 lună, first bullet: "piatra și pet[...]irea dentară profesională în
//      clinică" (the albire bullet's label was merged into the previous one);
//   6. the last sentence was cut after "în cea mai frumoasă".
// Only clear typos are fixed ("in consolă" -> "în consolă"). The bold lead-ins
// of the bullets follow the "Label: text" pattern of the original.
const CalendarulZambetuluiDeMireasa = () => (
  <ArticleLayout post={post} sections={Object.values(SECTIONS)}>
    <p>
      Pregătirea pentru ziua nunții constituie în sine o călătorie plină de emoție, cu focus pe
      detalii și cu dorința de a crea momente memorabile atât pentru miri, cât și pentru invitați.
    </p>
    <p>
      Dincolo de alegerea rochiei sau a locației perfecte, zâmbetul tău va fi în centrul atenției în
      fiecare fotografie și în fiecare îmbrățișare. Un zâmbet luminos și sănătos îți oferă încrederea
      de a străluci și de a fi acea mireasă frumoasă, cum ai visat mereu să fii.
    </p>
    <p>
      Dacă îți dorești o îmbunătățire a zâmbetului sau chiar o transformare a danturii, trebuie să te
      ocupi din timp. Pentru a obține cele mai bune rezultate fără stres pe ultima sută de metri,
      tratamentele stomatologice se planifică din timp. Iată un calendar personalizat, realizat de
      echipa Olidental Clinic și conceput în funcție de timpul pe care îl ai la dispoziție până la
      marele eveniment.
    </p>

    <h2 id={SECTIONS.oneYear.id}>{SECTIONS.oneYear.title}</h2>
    <h3>Tratamente complexe &amp; Reorganizare estetică</h3>
    <p>
      Dacă ai un an la dispoziție, ești în poziția ideală! Aceasta este perioada perfectă pentru a
      aborda tratamente de durată sau proceduri care necesită timp de vindecare și adaptare. Și e
      posibil să îți permiți să nu grăbești unele proceduri.
    </p>
    <p>
      <strong>Ce poate presupune?</strong>
    </p>
    <ul>
      <li>
        <strong>
          <Link href="/programare">Consultația inițială</Link> și igienizarea completă:
        </strong>{' '}
        Evaluăm starea generală de sănătate orală, realizăm radiografiile/CT-urile necesare și
        stabilim un plan personalizat.
      </li>
      <li>
        <strong>
          Tratamente ortodontice (Aparate dentare clasice sau alignere transparente):
        </strong>{' '}
        Dacă îți dorești îndreptarea dinților sau corectarea mușcăturii, alignerele invizibile sunt
        ideale pentru viitoarele mirese – sunt discrete, confortabile și pot oferi rezultate
        spectaculoase în 9–12 luni.
      </li>
      <li>
        <strong>
          <Link href="/implantologie">Implanturi dentare</Link> sau{' '}
          <Link href="/restaurari-protetice-dentare">reabilitări protetice</Link>:
        </strong>{' '}
        Înlocuirea dinților lipsă necesită timp pentru osteointegrare și integrare estetică.
      </li>
      <li>
        <strong>Rezolvarea afecțiunilor existente:</strong> Tratarea cariilor, rezolvarea
        problemelor endodontice (de canal) și tratamentele parodontale de bază.
      </li>
    </ul>

    <h2 id={SECTIONS.sixMonths.id}>{SECTIONS.sixMonths.title}</h2>
    <h3>Estetică dentară &amp; Restaurări discrete</h3>
    <p>
      Cu jumătate de an înainte de eveniment, accentul se mută pe aspectul vizual fin și pe
      armonizarea liniei zâmbetului.
    </p>
    <ul>
      <li>
        <strong>
          <Link href="/fatete-coroane-ceramice">Fațetele dentare din ceramică</Link>:
        </strong>{' '}
        Dacă îți dorești schimbarea formei, a dimensiunii sau a culorii dinților, fațetele sunt
        soluția supremă pentru un zâmbet minunat, frumos și funcțional. Procesul necesită câteva
        etape de analiză estetică (
        <Link href="/estetica-zambetului">Digital Smile Design</Link>), amprentare și probă.
      </li>
      <li>
        <strong>Coroane dentare pe dinții vizibili:</strong> Înlocuirea vechilor restaurări care
        s-au decolorat sau nu mai corespund din punct de vedere estetic. Realizarea eventualelor
        punți pe dinți naturali sau în consolă.
      </li>
      <li>
        <strong>Evaluarea tratamentului ortodontic:</strong> În cazul în care urmezi deja un
        tratament cu alignere, la 6 luni ajustăm detaliile.
      </li>
    </ul>

    <h2 id={SECTIONS.threeMonths.id}>{SECTIONS.threeMonths.title}</h2>
    <h3>Finisaje &amp; Micro-estetică</h3>
    <p>
      Se poate considera că suntem pe ultima sută de metri cu lucrările structurale. Acum este
      momentul pentru ajustări minore și stabilizarea rezultatelor.
    </p>
    <ul>
      <li>
        <strong>Obturații estetice (plombe din compozit):</strong> Refacerea micilor ciobituri sau
        înlocuirea plombelor vechi din zona zâmbetului cu materiale moderne, perfect fizionomice.
      </li>
      <li>
        <strong>
          <Link href="/rezultate/estetica-gingivala">Conturarea gingivală</Link> (Gingivectomie /
          Gingivoplastie):
        </strong>{' '}
        Pentru persoanele cu „gummy smile” (zâmbet gingival), remodelarea ușoară a liniei gingiilor
        oferă o simetrie impecabilă dinților.
      </li>
      <li>
        <strong>Ajustări de ocluzie și finisări:</strong> Verificăm dacă mușcătura este corectă și
        dacă nu există zone de presiune neplăcute.
      </li>
    </ul>

    <h2 id={SECTIONS.oneMonth.id}>{SECTIONS.oneMonth.title}</h2>
    <h3>Strălucire &amp; Prospețime</h3>
    <p>
      Ultima lună este dedicată exclusiv luminozității și prospețimii. Evităm procedurile invazive
      pentru a elimina orice risc de disconfort sau sensibilitate.
    </p>
    <ul>
      <li>
        <strong>Profilaxie profesională (Airflow, Detartraj, Periaj profesional):</strong>{' '}
        Îndepărtăm placa bacteriană, piatra și petele de pe dinți.
      </li>
      <li>
        <strong>Albirea dentară profesională în clinică:</strong> Realizată în siguranță sub
        supravegherea medicului stomatolog, albirea oferă dinților o nuanță vizibil mai albă și mai
        strălucitoare în doar o singură ședință. Facem acest pas cu 2-3 săptămâni înainte de nuntă
        pentru ca eventuala sensibilitate temporară să dispară complet.
      </li>
      <li>
        <strong>Kit de întreținere pentru acasă:</strong> Îți oferim indicațiile necesare privind
        alimentația din ultimele săptămâni (evitarea alimentelor și băuturilor colorate) pentru a
        menține rezultatul impecabil.
      </li>
    </ul>

    <h2 id={SECTIONS.recommendation.id}>{SECTIONS.recommendation.title}</h2>
    <p>
      Indiferent de momentul în care te afli cu pregătirile, cel mai important pas este{' '}
      <Link href="/programare">prima consultație</Link>. Chiar dacă mai ai doar o lună sau câteva
      săptămâni, există întotdeauna opțiuni rapide și sigure de profilaxie și albire care pot face o
      diferență enormă pentru frumusețea zâmbetului tău.
    </p>
    <p>
      Te așteptăm la <strong>Olidental Clinic</strong> să conturăm împreună zâmbetul pe care îl vei
      purta cu mândrie în cea mai frumoasă zi din viața ta.
    </p>
  </ArticleLayout>
);

CalendarulZambetuluiDeMireasa.seo = buildPostSeo(post);

export default CalendarulZambetuluiDeMireasa;
