import CustomCard from './customCard';
import { services } from '../utils/uiConstants';

const Services = () => {
  return (
    <div className="services-one pt-3 pb-3 mt-3 mb-3">
      <div className="container">
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          {services.map(service => (
            <CustomCard
            key={service.id}
            id={service.id}
            link={service.link}
            imgSrc={service.logo}
            title={service.title}
            //body={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
