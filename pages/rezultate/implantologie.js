import { beforeAfter } from "../../utils/uiConstants";
import ImageComparator from "../../components/imageComparator";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../../components/iconLink';
import styles from '../../styles/rezultate.module.css';
import ResultsDisclaimer from '../../components/resultsDisclaimer';

const ORDER = [6, 7, 2, 17, 18, 13, 3, 8, 11, 10, 12, 5, 4, 9, 1, 14, 15, 16, 19, 20]; // 1-based, matches pages/rezultate.js curated display order

const RezultateImplantologie = () => {
    const cases = ORDER
        .map((num) => beforeAfter[num - 1])
        .filter((c) => c && c.resultCategory === 'implantologie');

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '50rem' }}>
                    <IconLink label="Înapoi la rezultate" href="/rezultate">
                        <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
                    </IconLink>
                    <hr/>
                    <div className="text-center">
                        <h1>Rezultate implantologie dentară: cazuri reale, înainte și după</h1>
                    </div>
                    <p>Implanturile dentare sunt soluția potrivită atunci când unul sau mai mulți dinți lipsesc, fiind afectați de boală parodontală, tratamente eșuate sau uzură severă. La Olidental Clinic Timișoara, folosim implanturile dentare atât pentru înlocuirea dinților lipsă, cât și ca parte a unor planuri de tratament mai complexe, combinate cu tratamente parodontale sau restaurări protetice. Mai jos găsești cazuri reale de pacienți la care implantologia a redat funcția masticatorie și un aspect natural al zâmbetului, inclusiv situații în care am corectat tratamente cu implanturi realizate incorect în altă parte.</p>

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
                        <IconLink label="Vezi pagina de implantologie" href="/implantologie">
                            <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: "pointer", transform: 'scaleX(-1)' }}/>
                        </IconLink>
                    </div>
                    <ResultsDisclaimer />
                </div>
            </div>
        </div>
    )
}

RezultateImplantologie.seo = {
    title: "Rezultate implantologie dentară | Olidental Clinic Timișoara",
    description: "Cazuri reale de pacienți tratați prin implantologie dentară la Olidental Clinic Timișoara, cu rezultate înainte și după, inclusiv corectarea unor tratamente eșuate.",
    canonical: "https://olidental.ro/rezultate/implantologie",
};

export default RezultateImplantologie;
