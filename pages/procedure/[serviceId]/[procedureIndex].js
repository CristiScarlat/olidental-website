import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { services, servicesImages } from "../../../utils/uiConstants";

const Procedure = () => {
    const [imagesList, setImagesList] = useState();
    const router = useRouter();
    const { serviceId, procedureIndex } = router.query;
    //{`serviceId: ${serviceId} procedureInx: ${procedureIndex}`}

    useEffect(() => {
        //setImagesList(servicesImages[Number(serviceId)]);
    }, [serviceId])

    return (
        <div className="services-container m-auto">
            <div className="p-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '60rem' }}>
                    <div className="text-center">
                        <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt="..." style={{ width: "120px" }} />
                        <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
                    </div>
                    <div className="services-container-description" dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}></div>
                </div>
            </div>
            <div className="d-flex" style={{ overflowX: 'auto' }}>
                {services[serviceId]?.procedures[procedureIndex]?.images?.map(image => <img key={image} src={`/images/services/${services[serviceId]?.procedures[procedureIndex]?.dirPath}/${image}`} style={{ width: 280 }} />)}
            </div>
        </div>
    )
}

export default Procedure;