import { useRouter } from 'next/router';
import CustomCard from './customCard';
import { services } from '../utils/uiConstants';

const Services = () => {
  const router = useRouter();

  const handleRedirect = (id) => {
    router.push(`/service/${id}`);
  };

  return (
    <div className="services-one">
      <div className="container">
        <div className="row">
          {services.map(service => (
            <CustomCard
            key={service.id}
            id={service.id}
            onClick={handleRedirect}
            imgSrc={service.logo}
            title={service.title}
            body={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
