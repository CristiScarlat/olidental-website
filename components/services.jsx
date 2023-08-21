import { useRouter } from 'next/router';
import CustomCard from './customCard';
import { services } from '../utils/uiConstants';

const Services = () => {
  const router = useRouter();

  const handleRedirect = (id) => {
    router.push(`/service/${id}`);
  };

  return (
    <div className="services-one pt-3 pb-3 mt-3 mb-3">
      <div className="container">
        <div className="row justify-content-center gap-3">
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
