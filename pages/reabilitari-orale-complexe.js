import { useRouter } from "next/router";
import { services } from "../utils/uiConstants";
import CustomCard from "../components/customCard";
import { TfiHandPointLeft } from 'react-icons/tfi';
import IconLink from '../components/iconLink';


const ReabilitariOraleComplexe = () => {
    const router = useRouter();
    const serviceId = 2;

    const handleRedirectToProcedure = (link) => {
        router.push(link)
    }

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '50rem' }}>
                    <IconLink label="Înapoi la servicii" href="/servicii">
                        <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
                    </IconLink>
                    <hr/>
                    <div className="text-center">
                        <img src={services[serviceId]?.logo || ''} alt="..." style={{ width: "120px" }} />
                        <h3>{services[serviceId]?.title || ''}</h3>
                    </div>
                    <div className="services-one">
                        <div className="container">
                            <div className="row justify-content-center gap-3">
                                {services[serviceId]?.procedures.map((procedure, index) => (
                                  <CustomCard
                                    key={procedure.title}
                                    imgSrc={procedure.logo}
                                    imgStyle={{ width: 65 }}
                                    title={procedure.title}
                                    //body={procedure.description}
                                    onClick={() => handleRedirectToProcedure(procedure.link)}
                                  />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="services-container-description" dangerouslySetInnerHTML={{ __html: services[serviceId]?.description || '' }}></div>
                </div>
            </div>
            {/*<div className="d-flex custom-scroll m-auto" style={{ overflowX: 'auto', maxWidth: '60rem' }}>*/}
            {/*    {services[serviceId]?.images?.map(image => <img key={image} src={`/images/services/${services[serviceId]?.dirPath}/${image}`} style={{ width: 280 }} />)}*/}
            {/*</div>*/}

        </div>
    )
}

export default ReabilitariOraleComplexe;