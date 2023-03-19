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
        <div className="pt-3 mb-2 d-flex flex-column custom-scroll">
          <div className="m-2 d-flex flex-column gap-2" onClick={handleChangeImages}>
            {services[serviceId]?.procedures[procedureIndex]?.cazuri?.images.map((batch, index) => {
              return (
                <>
                  <div key={index} className="d-flex gap-2 text-center">
                    {batch.map((image, index) => (
                      <div key={image + index}>
                        <img
                          src={`/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/thumbnail_${image}`}
                          className="procedure-cazuri-img mx-2"
                        />
                        {index === 0 && <div className="mx-2">înainte</div>}
                        {index === 1 && <div className="mx-2">în lucru</div>}
                        {index === 2 && <div className="mx-2">după</div>}
                      </div>
                    ))}
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
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
