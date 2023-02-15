import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { services } from '../../../utils/uiConstants';
import FadeCarousel from '../../../components/fadeCarousel';

const Procedure = () => {
  const router = useRouter();
  const { serviceId, procedureIndex } = router.query;
  console.log({ serviceId, procedureIndex });
  return (
    <div className="services-container m-auto">
      <div className="pt-4 pb-4 bg-gray">
        <div className="m-auto" style={{ maxWidth: '60rem' }}>
          <div className="text-center">
            <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt="..." style={{ width: '75px' }} />
            <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
          </div>
        </div>
        <div className="m-auto" style={{ maxWidth: '60rem', overflow: 'hidden' }}>
          <FadeCarousel
            images={services[serviceId]?.procedures[procedureIndex]?.cazuri?.images}
            path={`/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/`}
          />
        </div>
        <div className="m-auto p-2" style={{ maxWidth: '60rem' }}>
          <div
            className="services-container-description"
            dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Procedure;
