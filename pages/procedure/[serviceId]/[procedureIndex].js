import { useRouter } from 'next/router';
import { services } from '../../../utils/uiConstants';
import { TfiHandPointLeft } from 'react-icons/tfi';
import Link from 'next/link';
import CustomCarousel from '../../../components/carousel';
import ThreeLayerImageComparator from '../../../components/ThreeLayerImageComparator';
import ListNavCarousel from '../../../components/ListNavCarousel';
import ImageComparator from '../../../components/imageComparator';
import { useEffect, useRef } from 'react';

const Procedure = () => {
  const router = useRouter();
  const { serviceId, procedureIndex } = router.query;

  const windowWidth = useRef();

  useEffect(() => {
    windowWidth.current = window?.innerWidth
  }, [])
  return (
    <div className='services-container m-auto'>
      <div className='pt-4 pb-4 bg-gray'>
        <div className='m-auto' style={{ maxWidth: '60rem' }}>
          <div className='d-flex align-items-center gap-2 justify-content-md-start justify-content-center px-2'>
            <TfiHandPointLeft size='2rem' color='#6cab44' />
            <Link href={`/service/${serviceId}`}>
              <span className='custom-link-services'>{`Mergi înapoi la ${services[serviceId]?.title}`}</span>
            </Link>
          </div>
          <hr className='w-100' />
          <div className='text-center'>
            <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt='...'
                 style={{ width: '75px' }} />
            <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
          </div>
        </div>
        <div className='pt-3 mb-2 d-flex flex-column m-auto' style={{ maxWidth: '60rem' }}>
          <ListNavCarousel>
            {services[serviceId]?.procedures[procedureIndex]?.cazuri?.images.map((batch, index) => (
              <div key={index}>
              {batch.length === 3 &&
              <ThreeLayerImageComparator
                                         images={batch.map(image => `/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/thumbnail_${image}`)} />}
              {batch.length === 2 &&
              <ImageComparator
                               images={batch.map(image => `/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/thumbnail_${image}`)}
                               showCursor={false}
                               maxWidth={'100%'}
                               height={400}
              />}
              </div>
            ))}
          </ListNavCarousel>
          {windowWidth.current <= 400 && <p className="text-center opacity-75">Touch image to see full width.</p>}
        </div>
        <div className='m-auto p-2' style={{ maxWidth: '60rem' }}>
          <div
            className='services-container-description'
            dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Procedure;
