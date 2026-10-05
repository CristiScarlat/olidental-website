import Link from 'next/link';
import ArticleLayout from '../../components/blog/ArticleLayout';
import { getPostBySlug } from '../../utils/blogPosts';
import { buildPostSeo } from '../../utils/blogSchema';

const post = getPostBySlug('de-ce-sa-alegi-olidental-clinic');

const IMAGE_DIR = '/images/blog/de-ce-sa-alegi-olidental-clinic';
const FIGURE_SIZES = '(max-width: 800px) 100vw, 48rem';

const RADIOLOGY_IMAGE = {
  src: `${IMAGE_DIR}/radiologie-1200.webp`,
  srcSet: `${IMAGE_DIR}/radiologie-800.webp 800w, ${IMAGE_DIR}/radiologie-1200.webp 1200w`,
  width: 1200,
  height: 799,
};

const MICROSCOPE_IMAGE = {
  src: `${IMAGE_DIR}/microscop-1200.webp`,
  srcSet: `${IMAGE_DIR}/microscop-800.webp 800w, ${IMAGE_DIR}/microscop-1200.webp 1200w`,
  width: 1200,
  height: 801,
};

// The article's H2s: `title` is the heading as written by the clinic,
// `label` its short form in the table of contents, `id` the link anchor.
const SECTIONS = {
  expertise: {
    id: 'expertiza-universitara',
    title: '1. Leadership medical și expertiză universitară: fondată de Dr. Olimpiu Karancsi (Dr. Oli)',
    label: 'Expertiză universitară',
  },
  noFear: {
    id: 'fara-frica',
    title: '2. Tratamente fără frică și fără judecată: un spațiu sigur pentru fiecare pacient',
    label: 'Fără frică și fără judecată',
  },
  smileDesign: {
    id: 'smile-design',
    title: '3. Predictibilitate și Smile Design: vezi noul zâmbet înainte de a începe tratamentul',
    label: 'Smile Design',
  },
  imaging: {
    id: 'radiologie-imagistica-3d',
    title: '4. Toate serviciile sub același acoperiș (inclusiv radiologie și imagistică 3D)',
    label: 'Radiologie și imagistică 3D',
  },
  interdisciplinary: {
    id: 'abordare-interdisciplinara',
    title: '5. Abordare interdisciplinară pentru reabilitări orale complexe',
    label: 'Abordare interdisciplinară',
  },
  minimallyInvasive: {
    id: 'minim-invaziv',
    title: '6. Filozofie minim invazivă și materiale de calitate premium',
    label: 'Minim invaziv, materiale premium',
  },
  financing: {
    id: 'finantare',
    title: '7. Soluții flexibile de finanțare a tratamentului',
    label: 'Finanțare și plata în rate',
  },
  treatmentPlan: {
    id: 'plan-de-tratament',
    title: '8. Plan de tratament clar și transparent: știi mereu unde ești, cât durează și cât costă',
    label: 'Plan de tratament transparent',
  },
  promise: { id: 'promisiunea-olidental', title: 'Promisiunea Olidental Clinic', label: 'Promisiunea noastră' },
};

const ArticleFigure = ({ image, alt, caption }) => (
  <figure>
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={FIGURE_SIZES}
      width={image.width}
      height={image.height}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
    <figcaption>{caption}</figcaption>
  </figure>
);

// Article text and bold emphasis as written by the clinic (only typo fixes
// and internal links added); "Pe scurt", FAQ, founder box and CTA come from
// ArticleLayout.
const DeCeSaAlegiOlidentalClinic = () => (
  <ArticleLayout post={post} sections={Object.values(SECTIONS)}>
    <p>
      Alegerea unei clinici stomatologice nu este niciodată o decizie simplă. Într-un oraș dinamic,
      de mare anvergură, precum Timișoara, opțiunile sunt numeroase. Clinicile dentare tind să
      atingă cote înalte de calitate și performanță, să aibă prețuri asemănătoare, tehnologie
      modernă. În aceste condiții, găsirea clinicii potrivite poate fi o adevărată provocare.
    </p>
    <p>
      Și atunci, ce diferențiază <strong>Olidental Clinic</strong> de alte clinici din{' '}
      <strong>Timișoara?</strong>
    </p>
    <p>
      Iată motivele pentru care tot mai mulți pacienți aleg să își încredințeze zâmbetul echipei
      noastre:
    </p>

    <h2 id={SECTIONS.expertise.id}>{SECTIONS.expertise.title}</h2>
    <p>
      Fundamentul fiecărui tratament reușit este pregătirea riguroasă a medicului. Olidental Clinic
      este fondată și coordonată de{' '}
      <strong>
        <Link href="/echipa">Dr. Olimpiu Karancsi (Dr. Oli)</Link>
      </strong>
      , medic primar protetician și cadru didactic universitar.
    </p>
    <p>
      Această dublă calitate garantează că fiecare pacient beneficiază de un act medical bazat pe
      rigoare științifică, tehnică impecabilă și pe a fi up to date cu ultimele descoperiri din
      medicina dentară internațională. Pentru Dr. Oli și echipa sa, stomatologia constituie deopotrivă o știință
      exactă și o artă a atenției la detalii.
    </p>

    <h2 id={SECTIONS.noFear.id}>{SECTIONS.noFear.title}</h2>
    <p>
      Știm că mulți oameni amână vizita la stomatolog din cauza unor experiențe neplăcute din
      trecut, din frica de durere sau din jena de a-și arăta dantura.
    </p>
    <p>
      La Olidental, eliminăm complet aceste bariere. Îți oferim un mediu sigur, lipsit de stres și de
      judecată. Echipa noastră te tratează cu răbdare, atenție și respect în fiecare etapă. Îți
      explicăm pe îndelete fiecare procedură, astfel încât să ai mereu controlul și liniștea de care
      ai nevoie.
    </p>

    <h2 id={SECTIONS.smileDesign.id}>{SECTIONS.smileDesign.title}</h2>
    <p>
      Nesiguranța cu privire la modul în care vei arăta la finalul tratamentului este eliminată: cu
      ajutorul tehnologiilor moderne de{' '}
      <strong>
        <Link href="/estetica-zambetului">Smile Design</Link>
      </strong>{' '}
      și al simulărilor intraorale 3D, poți previzualiza și chiar „proba” noul tău zâmbet înainte de
      realizarea propriu-zisă a procedurilor.
    </p>
    <p>
      Această etapă îți oferă claritate absolută și garanția că rezultatul final se va potrivi
      perfect cu dorințele tale și cu fizionomia feței.
    </p>

    <h2 id={SECTIONS.imaging.id}>{SECTIONS.imaging.title}</h2>
    <p>
      Timpul este prețios. Pentru a-ți oferi un parcurs medical fluid și confortabil și pentru a ne
      asigura că avem la îndemână toate detaliile, am dotat Olidental Clinic cu propriul{' '}
      <strong>centru de imagistică digitală</strong>:
    </p>
    <ul>
      <li>
        <strong>Radiografii locale și panoramice (OPG)</strong> realizate pe loc;
      </li>
      <li>
        <strong>Tomografie Computerizată 3D (CBCT)</strong> pentru diagnostic de mare precizie în
        implantologie și chirurgie;
      </li>
      <li>
        Servicii integrate de{' '}
        <strong>
          ortodonție, <Link href="/implantologie">implantologie</Link>,{' '}
          <Link href="/restaurari-protetice">protetică</Link>, endodonție și{' '}
          <Link href="/estetica-zambetului">estetică dentară</Link>
        </strong>
        .
      </li>
    </ul>
    <p>
      Astfel, economisești timp și beneficiezi de diagnostic și tratament complet, fără drumuri
      inutile către alte cabinete de radiologie.
    </p>
    <ArticleFigure
      image={RADIOLOGY_IMAGE}
      alt="Camera de radiologie a Olidental Clinic: aparatul de imagistică dentară și un medic care analizează imagini 3D pe monitor"
      caption="Centrul de imagistică digitală al Olidental Clinic, unde radiografiile și tomografia 3D se fac pe loc."
    />

    <h2 id={SECTIONS.interdisciplinary.id}>{SECTIONS.interdisciplinary.title}</h2>
    <p>
      Cazurile stomatologice complexe — de la refacerea completă a mușcăturii până la reabilitări
      estetice de mare amploare — necesită o viziune de ansamblu. La Olidental,{' '}
      <Link href="/reabilitari-orale-complexe">tratamentele de anvergură</Link> sunt gestionate
      integrat de către o echipă formată din diferiți specialiști (chirurg, proteticieni, ortodont),
      care colaborează strâns cu un laborator de tehnică dentară de top.
    </p>
    <p>
      Rezultatul? O funcționalitate impecabilă, durabilitate pe termen lung și un{' '}
      <Link href="/rezultate">aspect estetic spectaculos</Link>.
    </p>

    <h2 id={SECTIONS.minimallyInvasive.id}>{SECTIONS.minimallyInvasive.title}</h2>
    <p>
      Respectul pentru starea de sănătate a pacientului este regula noastră de aur. Utilizăm tehnici
      de lucru minim invazive, păstrând pe cât posibil mai mult din structura naturală a dinților
      tăi.
    </p>
    <p>
      În plus, selectăm exclusiv materiale biocompatibile de clasă premium și echipamente moderne,
      asigurând restaurări estetice, sigure și rezistente la uzura din timp.
    </p>
    <ArticleFigure
      image={MICROSCOPE_IMAGE}
      alt="Doi medici Olidental Clinic tratează o pacientă cu ajutorul microscopului dentar"
      caption="Tratament la microscopul dentar, într-unul dintre cabinetele Olidental Clinic."
    />

    <h2 id={SECTIONS.financing.id}>{SECTIONS.financing.title}</h2>
    <p>
      Sănătatea ta orală este o investiție pe viață și nu ar trebui să fie amânată din motive
      financiare. Pentru ca tu să beneficiezi de tratamentele necesare fără presiune, îți punem la
      dispoziție opțiuni de creditare financiară avantajoase, recomandându-ți parteneri de încredere
      pentru eșalonarea plăților.
    </p>

    <h2 id={SECTIONS.treatmentPlan.id}>{SECTIONS.treatmentPlan.title}</h2>
    <p>
      Nimic nu oferă mai multă liniște decât predictibilitatea. La Olidental Clinic, eliminăm
      surprizele neplăcute de pe parcurs. Încă de la început, primești un plan de tratament detaliat
      și ușor de înțeles.
    </p>
    <p>
      Știi exact în fiecare moment{' '}
      <strong>
        în ce etapă a tratamentului te afli, care este durata estimată și care sunt costurile
        aferente
      </strong>
      . Această transparență totală îți permite să îți organizezi timpul și bugetul fără stres,
      având control deplin asupra întregului proces.
    </p>

    <h2 id={SECTIONS.promise.id}>{SECTIONS.promise.title}</h2>
    <p>
      Misiunea noastră depășește simpla prestare a unor servicii stomatologice de înaltă calitate.
      Zi de zi, ne străduim să construim relații de încredere durabile și să oferim fiecărui om care
      ne trece pragul bucuria de a zâmbi din nou din plin.
    </p>
    <p>
      <strong>Ești pregătit să faci primul pas spre zâmbetul pe care îl meriți?</strong>
    </p>
    <p>
      Te așteptăm la <strong>Olidental Clinic în Timișoara</strong> pentru o{' '}
      <Link href="/programare">consultație personalizată</Link>!
    </p>
  </ArticleLayout>
);

DeCeSaAlegiOlidentalClinic.seo = buildPostSeo(post);

export default DeCeSaAlegiOlidentalClinic;
