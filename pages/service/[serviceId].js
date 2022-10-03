import { useRouter } from "next/router";
import { services } from "../../utils/uiConstants";

const Service = () => {
    const router = useRouter();
    const { serviceId } = router.query;

    return (
        <div className="services-container text-center p-4">
            <img src={services[0].logo} alt="..." style={{ width: "120px" }} />
            <h3>{services[0].title}</h3>
            <p>{services[0].description}</p>
            {services[0].procedures.map(procedure => (
                <div className="service-procedure-item">
                    <h4>{procedure.title}</h4>
                    <p>
                        <img src={procedure.logo} alt="..." />
                        {procedure.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Service;