import { useRouter } from "next/router";
import { services } from "../../utils/uiConstants";

const Service = () => {
    const router = useRouter();
    const { serviceId } = router.query;
    return (
        <div className="services-container text-center p-4">
            <img src={services[serviceId]?.logo || ''} alt="..." style={{ width: "120px" }} />
            <h3>{services[serviceId]?.title || ''}</h3>
            <p>{services[serviceId]?.description || ''}</p>
            <hr />
            <div>
                {services[serviceId]?.procedures.map(procedure => (
                    <div key={procedure.title} className="service-procedure-item">
                        <h4>{procedure.title}</h4>
                        <p>
                            <img src={procedure.logo} alt="..." />
                            {procedure.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Service;