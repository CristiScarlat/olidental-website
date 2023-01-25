import { useRouter } from "next/router";
import { services } from "../../utils/uiConstants";
import CustomCard from "../../components/customCard";

const Service = () => {
    const router = useRouter();
    const { serviceId } = router.query;
    return (
        <>

            <div className="services-container m-auto">
                <div className="p-4 bg-gray">
                    <div className="m-auto" style={{ maxWidth: '60rem' }}>
                        <div className="text-center">
                            <img src={services[serviceId]?.logo || ''} alt="..." style={{ width: "120px" }} />
                            <h3>{services[serviceId]?.title || ''}</h3>
                        </div>
                        <div className="services-container-description" dangerouslySetInnerHTML={{ __html: services[serviceId]?.description || '' }}></div>
                    </div>
                </div>
                <div className="services-one">
                    <div className="container">
                        <div className="row justify-content-center">
                            {services[serviceId]?.procedures.map(procedure => (
                                // <div key={procedure.title} className="service-procedure-item">
                                //     <h4>{procedure.title}</h4>
                                //     <img src={procedure.logo} alt="..." />
                                //     <p>{procedure.description}</p>
                                // </div>
                                <CustomCard
                                    key={procedure.title}
                                    imgSrc={procedure.logo}
                                    imgStyle={{ width: 65 }}
                                    title={procedure.title}
                                    body={procedure.description}
                                    onClick={() => console.log("click")}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service;