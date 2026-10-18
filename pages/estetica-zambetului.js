import { services } from "../utils/uiConstants";
import CustomCard from "../components/customCard";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../components/iconLink';
import TreatmentAttribution from '../components/treatmentAttribution';
import MedicalDisclaimer from '../components/medicalDisclaimer';
import BackLink from '../components/backLink';
import TreatmentLead from '../components/treatmentLead';
import treatmentStyles from '../components/styles/treatmentPage.module.css';

const PARAGRAPH_END = '</p>';

// The clinic's description is one HTML string. Splitting it after the first
// paragraph lets a heading sit above the planning paragraphs; the text itself
// stays untouched.
const splitAfterFirstParagraph = (html) => {
    const end = html.indexOf(PARAGRAPH_END);
    if (end === -1) return [html, ''];
    const cut = end + PARAGRAPH_END.length;
    return [html.slice(0, cut), html.slice(cut)];
};

const EsteticaZambetului = () => {
    const serviceId = 0;
    const [overviewHtml, planningHtml] = splitAfterFirstParagraph(services[serviceId]?.description || '');

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className={`m-auto ${treatmentStyles.content}`} style={{ maxWidth: '50rem' }}>
                    <BackLink label="Înapoi la servicii" href="/servicii"/>
                    <hr/>
                    <div className="text-center">
                        {/* Decorative service icon: intentionally alt="" since it's redundant with the h1 title below */}
                        <img src={services[serviceId]?.logo || ''} alt="" style={{ width: "120px" }} />
                        <h1>{services[serviceId]?.title || ''}</h1>
                        <TreatmentLead>Estetica zâmbetului la Olidental Clinic din Timișoara cuprinde fațete și coroane dentare integral ceramice, dar și restaurări protetice estetice.</TreatmentLead>
                        <h2>Tratamente de estetică a zâmbetului</h2>
                    </div>
                    <div className="services-one">
                        <div className="container">
                            <div className="row justify-content-center gap-3">
                                {services[serviceId]?.procedures.map((procedure, index) => (
                                  <CustomCard
                                    key={procedure.title}
                                    link={procedure.link}
                                    imgSrc={procedure.logo}
                                    imgStyle={{ width: 65 }}
                                    title={procedure.title}
                                    //body={procedure.description}
                                  />
                                ))}
                            </div>
                        </div>
                    </div>
                    <h2>Ce presupune estetica zâmbetului?</h2>
                    <div className="services-container-description" dangerouslySetInnerHTML={{ __html: overviewHtml }}></div>
                    {planningHtml.trim() && <>
                        <h2>Cum este planificat tratamentul estetic?</h2>
                        <div className="services-container-description" dangerouslySetInnerHTML={{ __html: planningHtml }}></div>
                    </>}
                    <TreatmentAttribution />
                    <MedicalDisclaimer />
                    <div className="mt-3">
                      <IconLink label="Vezi rezultate reale de fațete și coroane ceramice" href="/rezultate/fatete-coroane-ceramice">
                        <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: 'pointer', transform: 'scaleX(-1)' }}/>
                      </IconLink>
                    </div>
                    <div className="mt-3">
                      <IconLink label="Vezi rezultate reale de estetică gingivală" href="/rezultate/estetica-gingivala">
                        <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: 'pointer', transform: 'scaleX(-1)' }}/>
                      </IconLink>
                    </div>
                    <div className="mt-3">
                      <IconLink label="Vezi galeria de zâmbete" href="/zambete">
                        <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: 'pointer', transform: 'scaleX(-1)' }}/>
                      </IconLink>
                    </div>
                </div>
            </div>
            {/*<div className="d-flex custom-scroll m-auto" style={{ overflowX: 'auto', maxWidth: '60rem' }}>*/}
            {/*    {services[serviceId]?.images?.map(image => <img key={image} src={`/images/services/${services[serviceId]?.dirPath}/${image}`} style={{ width: 280 }} />)}*/}
            {/*</div>*/}

        </div>
    )
}

EsteticaZambetului.seo = {
    title: "Estetica zâmbetului | Olidental Clinic Timișoara",
    description: "Estetica zâmbetului la Olidental Clinic Timișoara: fațete și coroane dentare integral ceramice și restaurări protetice estetice, pentru un zâmbet natural.",
    canonical: "https://olidental.ro/estetica-zambetului",
};

export default EsteticaZambetului;