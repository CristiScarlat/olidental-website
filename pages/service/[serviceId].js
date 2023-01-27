import { useRouter } from "next/router";
import { services, servicesImages } from "../../utils/uiConstants";
import CustomCard from "../../components/customCard";
import { useEffect, useState } from "react";

const Service = () => {
    const [imagesList, setImagesList] = useState(); 
    const router = useRouter();
    const { serviceId } = router.query;
    
    useEffect(() => {
        setImagesList(servicesImages[Number(serviceId)])

    }, [serviceId])

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
                <div className="d-flex" style={{overflowX: 'auto'}}>
                    {imagesList?.images?.map(image => <img key={image} src={`/images/services/${imagesList.dirPath}/${image}`} style={{width: 280}}/>)}
                </div>
                <div className="services-one">
                    <div className="container">
                        <div className="row justify-content-center gap-3">
                            {services[serviceId]?.procedures.map(procedure => (
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