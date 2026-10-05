import { beforeAfter } from "../../utils/uiConstants";
import ImageComparator from "../../components/imageComparator";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../../components/iconLink';
import styles from '../../styles/rezultate.module.css';
import ResultsDisclaimer from '../../components/resultsDisclaimer';

const ORDER = [6, 7, 2, 17, 18, 13, 3, 8, 11, 10, 12, 5, 4, 9, 1, 14, 15, 16, 19, 20]; // 1-based, matches pages/rezultate.js curated display order

const RezultateReabilitareCompleta = () => {
    const cases = ORDER
        .map((num) => beforeAfter[num - 1])
        .filter((c) => c && c.resultCategory === 'reabilitare-orala-completa');

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '50rem' }}>
                    <IconLink label="Înapoi la rezultate" href="/rezultate">
                        <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
                    </IconLink>
                    <hr/>
                    <div className="text-center">
                        <h1>Rezultate reabilitare orală completă: cazuri reale, înainte și după</h1>
                    </div>
                    <p>Reabilitarea orală completă este cea mai complexă formă de tratament stomatologic, adresată situațiilor în care mai mulți dinți sau întreaga dantură necesită intervenție, de la boală parodontală avansată la dinți lipsă pe ambele arcade sau uzură severă. La Olidental Clinic Timișoara, aceste cazuri combină, de regulă, chirurgie osoasă și parodontală, implanturi dentare, tratamente endodontice și restaurări protetice, într-un plan de tratament etapizat. Mai jos găsești cazuri reale, unele desfășurate pe parcursul mai multor luni sau ani, în care am refăcut complet funcția masticatorie și estetica zâmbetului.</p>

                    {cases.map((obj, index) => (
                        <div key={obj.title + index} className={styles.descriptionColumnRezultateCard}>
                            <h3>{index + 1}. {obj.title}</h3>
                            <div style={{ marginBottom: '0.5rem' }}>Dificultate</div>
                            <div className="level-gradient-bar" style={{ background: `linear-gradient(90deg, #6cab44 ${obj.difficultyLevel * 10}%, #778187 ${obj.difficultyLevel * 10}%)` }} />
                            <div dangerouslySetInnerHTML={{ __html: obj.description }} />
                            <div className="m-auto w-100 unselectable children-no-border">
                                {obj.images?.map((imgs) => (
                                    Array.isArray(imgs) && <ImageComparator key={imgs[0]} images={imgs.map((imgName) => `/images/beforeAfter/thumbnail_${imgName}`)} maxWidth={600} altText={obj.title} />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: '2rem' }}>
                        <IconLink label="Vezi pagina de reabilitări orale complexe" href="/reabilitari-orale-complexe">
                            <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: "pointer", transform: 'scaleX(-1)' }}/>
                        </IconLink>
                    </div>
                    <ResultsDisclaimer />
                </div>
            </div>
        </div>
    )
}

RezultateReabilitareCompleta.seo = {
    title: "Rezultate reabilitare orală completă | Olidental Clinic Timișoara",
    description: "Cazuri complexe de reabilitare orală completă la Olidental Clinic Timișoara, cu rezultate reale, înainte și după, pentru pacienți cu nevoi dentare extinse.",
    canonical: "https://olidental.ro/rezultate/reabilitare-orala-completa",
};

export default RezultateReabilitareCompleta;
