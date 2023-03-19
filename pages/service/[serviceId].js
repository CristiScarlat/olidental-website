import { useRouter } from 'next/router';
import { services } from '../../utils/uiConstants';
import ServiceCard from '../../components/serviceCard';
import { Accordion } from 'react-bootstrap';

const Service = () => {
  //const [imagesList, setImagesList] = useState();
  const router = useRouter();
  const { serviceId } = router.query;
  console.log(serviceId);
  return (
    <div className="services-container m-auto">
      <div className="p-4 bg-gray">
        <div className="m-auto" style={{ maxWidth: '60rem' }}>
          <div className="text-center">
            <img src={services[serviceId]?.logo || ''} alt="..." style={{ width: '120px' }} />
            <h3>{services[serviceId]?.title || ''}</h3>
          </div>
          <div className="services-container-description" dangerouslySetInnerHTML={{ __html: services[serviceId]?.description || '' }}></div>
        </div>
      </div>
      <div className="d-flex custom-scroll" style={{ overflowX: 'auto' }}>
        {services[serviceId]?.images?.map((image) => (
          <img key={image} src={`/images/services/${services[serviceId]?.dirPath}/${image}`} style={{ width: 280 }} />
        ))}
      </div>
      <div className="services-one">
        <div className="container">
          <Accordion defaultActiveKey="0">
            {services[serviceId]?.procedures.map((procedure, index) => (
              <ServiceCard
                activeKey={index}
                key={procedure.title}
                imgSrc={procedure.logo}
                imgStyle={{ width: 65 }}
                title={procedure.title}
                body={procedure.description}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Service;
