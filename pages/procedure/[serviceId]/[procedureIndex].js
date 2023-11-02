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
import ScrollIndicator from '../../../components/scrollIndicator';
import ScrollIntoViewIndicator from '../../../components/scrollIntoViewIndicator';
import IconLink from '../../../components/iconLink';

const Procedure = () => {
  const [indexCaz, setIndexCaz] = useState(0);
  const [imgNo, setImgNo] = useState(0);
  const router = useRouter();
  const { serviceId, procedureIndex } = router.query;

  const windowWidth = useRef();
  const imageComparatorPreviewRef = useRef();

  useEffect(() => {
    windowWidth.current = window?.innerWidth;
  }, []);

  useEffect(() => {
    setImgNo(0)
  }, [indexCaz])

  const cazuri = services[serviceId]?.procedures[procedureIndex]?.cazuri;


  const handleNavPrev = () => {
    setIndexCaz(state => {
      if (state === 0) return cazuri.length - 1;
      return state - 1;
    });
    if(imageComparatorPreviewRef.current)imageComparatorPreviewRef.current.scrollLeft = 0
  };
  const handleNavNext = () => {
    setIndexCaz(state => {
      if (state === cazuri.length - 1) return 0;
      return state + 1;
    });
    if(imageComparatorPreviewRef.current)imageComparatorPreviewRef.current.scrollLeft = 0
  };

  const handleShowDeviderLabel = () => {
    if( router.asPath === '/procedure/1/1' ||  router.asPath === '/procedure/1/0')return false;
    return true;
  }

  const handleScrollPreviewLeft = () => {
    imageComparatorPreviewRef.current.scrollLeft -= 335;
  }

  const handleScrollPreviewRight = () => {
    imageComparatorPreviewRef.current.scrollLeft += 335;
  }
  const renderScrollIndicator = () => {
    const isNarrowWidth = window.innerWidth < 450;
    if(isNarrowWidth)return <ScrollIntoViewIndicator onClickLeft={handleScrollPreviewLeft} onClickRight={handleScrollPreviewRight} />;
    return null;

  }

  return (
    <div className='services-container m-auto'>
      <div className='pt-4 pb-4 bg-gray' >
        <div className='m-auto' style={{ maxWidth: '60rem' }}>
          <IconLink label={`Înapoi la ${services[serviceId]?.title}`} href={`/service/${serviceId}`}>
            <TfiHandPointLeft size='2rem' color='#6cab44' style={{cursor: "pointer"}}/>
          </IconLink>
          <hr className='w-100' />
          <div className='text-center'>
            <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt='...'
                 style={{ width: '75px', userSelect: 'none' }} />
            <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
          </div>
        </div>
        <div className='pt-3 mb-2 d-flex flex-column m-auto' style={{ maxWidth: '60rem' }}>
          {(cazuri?.length && cazuri[indexCaz].images.length > 1) && <div className={`${styles.imageComparatorContainerPreview}`}>

            <div className={styles.proceduresPreviewImagesContainer} ref={imageComparatorPreviewRef}>
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
            {renderScrollIndicator()}

          </div>}
          {cazuri?.length && <>
              {cazuri[indexCaz].images[imgNo].length === 3 &&
                <ThreeLayerImageComparator height={500}
                                           images={cazuri[indexCaz].images[0].map(image => `/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`)}
                                            showDeviderLabel={handleShowDeviderLabel()}/>}
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
          {(cazuri?.length && cazuri[indexCaz].images[imgNo].length > 2) && <p className='text-center fs-6 opacity-50 visible-400'>Atinge imaginea</p>}
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