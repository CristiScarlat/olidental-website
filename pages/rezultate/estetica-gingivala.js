import { beforeAfter } from "../../utils/uiConstants";
import ImageComparator from "../../components/imageComparator";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../../components/iconLink';
import styles from '../../styles/rezultate.module.css';
import ResultsDisclaimer from '../../components/resultsDisclaimer';
import { toWebp } from '../../utils/images';

const ORDER = [6, 7, 2, 17, 18, 13, 3, 8, 11, 10, 12, 5, 4, 9, 1, 14, 15, 16, 19, 20]; // 1-based, matches pages/rezultate.js curated display order

const RezultateEsteticaGingivala = () => {
    const cases = ORDER
        .map((num) => beforeAfter[num - 1])
        .filter((c) => c && c.resultCategory === 'estetica-gingivala');

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '50rem' }}>
                    <IconLink label="Înapoi la rezultate" href="/rezultate">
                        <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
                    </IconLink>
                    <hr/>
                    <div className="text-center">
                        <h1>Rezultate estetică gingivală: cazuri reale, înainte și după</h1>
                    </div>
                    <p>Zâmbetul nu depinde doar de forma și culoarea dinților, ci și de aspectul gingiei din jurul lor. Un zâmbet gingival pronunțat, o asimetrie a conturului gingival sau o degradare a țesuturilor de susținere pot afecta estetica generală, chiar dacă dinții în sine sunt sănătoși. La Olidental Clinic Timișoara, corectăm aceste situații prin chirurgie gingivală și osoasă, adesea combinată cu restaurări integral ceramice pentru un rezultat complet. Mai jos găsești cazuri reale în care am reechilibrat raportul dintre dinți și gingie, obținând zâmbete mai simetrice, mai sănătoase și mai armonioase.</p>

                    {cases.map((obj, index) => (
                        <div key={obj.title + index} className={styles.descriptionColumnRezultateCard}>
                            <h3>{index + 1}. {obj.title}</h3>
                            <div style={{ marginBottom: '0.5rem' }}>Dificultate</div>
                            <div className="level-gradient-bar" style={{ background: `linear-gradient(90deg, #6cab44 ${obj.difficultyLevel * 10}%, #778187 ${obj.difficultyLevel * 10}%)` }} />
                            <div dangerouslySetInnerHTML={{ __html: obj.description }} />
                            <div className="m-auto w-100 unselectable children-no-border">
                                {obj.images?.map((imgs) => (
                                    Array.isArray(imgs) && <ImageComparator key={imgs[0]} images={imgs.map((imgName) => toWebp(`/images/beforeAfter/thumbnail_${imgName}`))} maxWidth={600} altText={obj.title} />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '2rem' }}>
                        <IconLink label="Vezi pagina de estetica zâmbetului" href="/estetica-zambetului">
                            <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: "pointer", transform: 'scaleX(-1)' }}/>
                        </IconLink>
                    </div>
                    <ResultsDisclaimer />
                </div>
            </div>
        </div>
    )
}

RezultateEsteticaGingivala.seo = {
    title: "Rezultate estetică gingivală | Olidental Clinic Timișoara",
    description: "Cazuri reale de corectare a zâmbetului gingival și chirurgie gingivală estetică la Olidental Clinic Timișoara, cu rezultate înainte și după.",
    canonical: "https://olidental.ro/rezultate/estetica-gingivala",
};

export default RezultateEsteticaGingivala;
