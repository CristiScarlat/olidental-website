import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { services } from '../../../utils/uiConstants';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Procedure = () => {
  const [imagesIndex, setImagesIndex] = useState(0);
  const router = useRouter();
  const { serviceId, procedureIndex } = router.query;

  useEffect(() => {
    const id = setInterval(() => {
      handleChangeImages();
    }, 60000);
    return () => clearInterval(id);
  });
  const handleChangeImages = () => {
    setImagesIndex((state) => {
      if (state === 5) return 0;
      else return state + 1;
    });
  };

  return (
    <div className="services-container m-auto">
      <div className="pt-4 pb-4 bg-gray">
        <div className="m-auto" style={{ maxWidth: '60rem' }}>
          <div className="text-center">
            <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt="..." style={{ width: '75px' }} />
            <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
          </div>
        </div>
        <div className="pt-3 mb-2 d-flex flex-column custom-scroll" style={{ overflowX: 'auto' }}>
          <div className="mb-3 d-flex me-auto ms-auto gap-md-1" style={{ minHeight: '12rem' }} onClick={handleChangeImages}>
            {services[serviceId]?.procedures[procedureIndex]?.cazuri?.images[imagesIndex].map((image, index) => (
              <div key={image + index}>
                <img src={`/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/thumbnail_${image}`} className="procedure-cazuri-img" />
              </div>
            ))}
          </div>
        </div>
        <div className="m-auto ps-4 pe-4" style={{ maxWidth: '60rem' }}>
          <div
            className="services-container-description"
            dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}
          ></div>
        </div>
      </div>
      {/* <div className="d-flex" style={{ overflowX: 'auto' }}>
                {services[serviceId]?.procedures[procedureIndex]?.images?.map(image => <img key={image} src={`/images/services/${services[serviceId]?.procedures[procedureIndex]?.dirPath}/${image}`} style={{ width: 280 }} />)}
            </div> */}
    </div>
  );
};

export default Procedure;
