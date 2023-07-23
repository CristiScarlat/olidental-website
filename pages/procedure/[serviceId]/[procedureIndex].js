import { useRouter } from 'next/router';
import { services } from '../../../utils/uiConstants';
import { TfiHandPointLeft } from 'react-icons/tfi';
import Link from 'next/link';
import CustomCarousel from '../../../components/carousel';
import ThreeLayerImageComparator from '../../../components/ThreeLayerImageComparator';
import ListNavCarousel from '../../../components/ListNavCarousel';
import ImageComparator from '../../../components/imageComparator';
import { useEffect, useRef, useState } from 'react';
import styles from '../../../components/styles/styles.module.css';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

const Procedure = () => {
  const [indexCaz, setIndexCaz] = useState(0);
  const [imgNo, setImgNo] = useState(0);
  const router = useRouter();
  const { serviceId, procedureIndex } = router.query;

  const windowWidth = useRef();

  useEffect(() => {
    windowWidth.current = window?.innerWidth;
  }, []);

  useEffect(() => {
    setImgNo(0)
  }, [indexCaz])

  const cazuri = services[serviceId]?.procedures[procedureIndex]?.cazuri;

  console.log({ cazuri: services[serviceId]?.procedures[procedureIndex].cazuri });

  const handleNavPrev = () => {
    setIndexCaz(state => {
      if (state === 0) return cazuri.length - 1;
      return state - 1;
    });
  };
  const handleNavNext = () => {
    setIndexCaz(state => {
      if (state === cazuri.length - 1) return 0;
      return state + 1;
    });
  };

  return (
    <div className='services-container m-auto'>
      <div className='pt-4 pb-4 bg-gray' >
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
                 style={{ width: '75px', userSelect: 'none' }} />
            <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
          </div>
        </div>
        <div className='pt-3 mb-2 d-flex flex-column m-auto' style={{ maxWidth: '60rem' }}>
          {(cazuri?.length && cazuri[indexCaz].images.length > 1) && <div className={`${styles.imageComparatorContainerPreview}`}>
            <span>Multiple faze în rezolvarea cazului</span>
            <div className={styles.proceduresPreviewImagesContainer}>
              {cazuri[indexCaz].images.map((batch, index) => (
                  <div
                    key={batch.join()}
                    className={styles.proceduresPreviewImages}
                    style={{backgroundColor: index === imgNo ? '#6cab44' : '#80808091'}}
                    onClick={() => setImgNo(index)}>
                    {batch.map(image => <img key={image}
                                             src={`/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`}
                                             alt='before/after-3layer-preview'
                    />)}
                  </div>
                ))}
            </div>
          </div>}
          {cazuri?.length && <>
              {cazuri[indexCaz].images[imgNo].length === 3 &&
                <ThreeLayerImageComparator height={500}
                                           images={cazuri[indexCaz].images[0].map(image => `/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`)} />}
              {cazuri[indexCaz].images[imgNo].length === 2 &&
                <ImageComparator
                  images={cazuri[indexCaz].images[imgNo].map(image => `/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`)}
                  //showCursor={false}
                  maxWidth={850}
                />}
            </>
          }
          <div className={styles.listNavCarouselControlsContainer}>
            <button onClick={handleNavPrev}><BiCaretLeft /></button>
            <span>{`${indexCaz + 1}/${cazuri?.length}`}</span>
            <button onClick={handleNavNext}><BiCaretRight /></button>
          </div>
          {windowWidth.current <= 400 && <p className='text-center opacity-75'>Touch image to see full width.</p>}
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


/*
<div className={`${styles.imageComparatorContainerPreview}`}>
        <span>Multiple faze în rezolvarea cazului</span>
        <div className="d-flex justify-content-start gap-4 p-3" style={{overflowX: 'auto'}}>
          {childrenCount && renderChildren()}
        </div>
      </div>
 */