import { services } from "../utils/uiConstants";
import CustomCard from "../components/customCard";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../components/iconLink';
import TreatmentAttribution from '../components/treatmentAttribution';
import MedicalDisclaimer from '../components/medicalDisclaimer';


const ReabilitariOraleComplexe = () => {
    const serviceId = 2;

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '50rem' }}>
                    <IconLink label="Înapoi la servicii" href="/servicii">
                        <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
                    </IconLink>
                    <hr/>
                    <div className="text-center">
                        {/* Decorative service icon: intentionally alt="" since it's redundant with the h1 title below */}
                        <img src={services[serviceId]?.logo || ''} alt="" style={{ width: "120px" }} />
                        <h1>{services[serviceId]?.title || ''}</h1>
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
                    <div className="services-container-description" dangerouslySetInnerHTML={{ __html: services[serviceId]?.description || '' }}></div>
                    <TreatmentAttribution />
                    <MedicalDisclaimer />
                    <div className="mt-3">
                        <IconLink label="Vezi rezultate reale de reabilitare orală completă" href="/rezultate/reabilitare-orala-completa">
                            <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: "pointer", transform: 'scaleX(-1)' }}/>
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

ReabilitariOraleComplexe.seo = {
    title: "Reabilitări orale complexe | Olidental Clinic Timișoara",
    description: "Reabilitări orale complexe la Olidental Clinic Timișoara: restaurări pe dinți naturali și implanturi, tratamente multidisciplinare pentru cazuri dificile.",
    canonical: "https://olidental.ro/reabilitari-orale-complexe",
};

export default ReabilitariOraleComplexe;