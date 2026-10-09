import { beforeAfter } from "../../utils/uiConstants";
import ImageComparator from "../../components/imageComparator";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../../components/iconLink';
import styles from '../../styles/rezultate.module.css';
import ResultsDisclaimer from '../../components/resultsDisclaimer';
import { toWebp } from '../../utils/images';

const ORDER = [6, 7, 2, 17, 18, 13, 3, 8, 11, 10, 12, 5, 4, 9, 1, 14, 15, 16, 19, 20]; // 1-based, matches pages/rezultate.js curated display order

const RezultateFatetesiCoroane = () => {
    const cases = ORDER
        .map((num) => beforeAfter[num - 1])
        .filter((c) => c && c.resultCategory === 'fatete-coroane-ceramice');

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '50rem' }}>
                    <IconLink label="Înapoi la rezultate" href="/rezultate">
                        <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
                    </IconLink>
                    <hr/>
                    <div className="text-center">
                        <h1>Rezultate fațete și coroane ceramice: cazuri reale, înainte și după</h1>
                    </div>
                    <p>Fațetele și coroanele integral ceramice sunt una dintre cele mai folosite soluții pentru corectarea aspectului dinților afectați de uzură, pigmentări sau restaurări vechi. La Olidental Clinic Timișoara, aceste restaurări sunt alese pentru aspectul lor natural, care se integrează armonios cu restul danturii, fără a necesita intervenții ample. Mai jos găsești câteva cazuri reale, tratate în clinica noastră, în care fațetele și coroanele integral ceramice au adus un zâmbet mai luminos, mai simetric și mai sănătos. Fiecare caz este diferit, iar rezultatul depinde de starea inițială a dinților și de obiectivele fiecărui pacient.</p>

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
                        <IconLink label="Vezi pagina de fațete și coroane integral ceramice" href="/fatete-coroane-ceramice">
                            <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: "pointer", transform: 'scaleX(-1)' }}/>
                        </IconLink>
                    </div>
                    <ResultsDisclaimer />
                </div>
            </div>
        </div>
    )
}

RezultateFatetesiCoroane.seo = {
    title: "Rezultate fațete și coroane ceramice | Olidental Timișoara",
    description: "Cazuri reale tratate cu fațete și coroane integral ceramice la Olidental Clinic Timișoara, cu fotografii înainte și după și detalii despre tratament.",
    canonical: "https://olidental.ro/rezultate/fatete-coroane-ceramice",
};

export default RezultateFatetesiCoroane;
