import { useRouter } from 'next/router';
import { services } from '../utils/uiConstants';
import { TfiHandPointLeft } from 'react-icons/tfi';
import ThreeLayerImageComparator from '../components/ThreeLayerImageComparator';
import ImageComparator from '../components/imageComparator';
import { useEffect, useRef, useState } from 'react';
import styles from '../components/styles/styles.module.css';
import treatmentStyles from '../components/styles/treatmentPage.module.css';
import ScrollIntoViewIndicator from '../components/scrollIntoViewIndicator';
import IconLink from '../components/iconLink';
import TreatmentAttribution from '../components/treatmentAttribution';
import MedicalDisclaimer from '../components/medicalDisclaimer';
import BackLink from '../components/backLink';
import TreatmentLead from '../components/treatmentLead';
import CaseNavControls from '../components/caseNavControls';
import { toWebp } from '../utils/images';
import { useIsNarrowWidth } from '../utils/useIsNarrowWidth';
import TarifeLink from '../components/tarifeLink';

const InserareImplantAditiiOs = () => {
  const [indexCaz, setIndexCaz] = useState(0);
  const [imgNo, setImgNo] = useState(0);
  const router = useRouter();
  const serviceId = 1;
  const procedureIndex = 0;

  const imageComparatorPreviewRef = useRef();

  useEffect(() => {
    setImgNo(0)
  }, [indexCaz])

  // Measured after mount, so server and client render the same markup
  // (see utils/useIsNarrowWidth.js).
  const isNarrowWidth = useIsNarrowWidth();

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
    if( router.asPath === '/restaurari-protetice-dentare' ||  router.asPath === '/inserare-implant-aditii-os')return false;
    return true;
  }

  const handleScrollPreviewLeft = () => {
    imageComparatorPreviewRef.current.scrollLeft -= 335;
  }

  const handleScrollPreviewRight = () => {
    imageComparatorPreviewRef.current.scrollLeft += 335;
  }
  const renderScrollIndicator = () => {
    if(isNarrowWidth)return <ScrollIntoViewIndicator onClickLeft={handleScrollPreviewLeft} onClickRight={handleScrollPreviewRight} />;
    return null;
  }

  return (
    <div className='services-container m-auto'>
      <div className='pt-4 pb-4 bg-gray' >
        <div className={`m-auto ${treatmentStyles.content}`} style={{ maxWidth: '60rem' }}>
          <BackLink label={`Înapoi la ${services[serviceId]?.title}`} href='/implantologie'/>
          <hr className='w-100' />
          <div className='text-center'>
            {/* Decorative procedure icon: intentionally alt="" since it's redundant with the h1 title below */}
            <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt=''
                 style={{ width: '75px', userSelect: 'none' }} />
            <h1>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h1>
            <TreatmentLead>Inserare de implanturi dentare și adiții de os la Olidental Clinic din Timișoara: etapa chirurgicală a tratamentului de implantologie orală.</TreatmentLead>
          </div>
          <div className='pt-3 mb-2 d-flex flex-column'>
            {(cazuri?.length && cazuri[indexCaz].images.length > 1) && <div className={`${styles.imageComparatorContainerPreview}`}>

              <div className={styles.proceduresPreviewImagesContainer} ref={imageComparatorPreviewRef}>
                {cazuri[indexCaz].images.map((batch, index) => (
                  <div
                    key={batch.join()}
                    className={styles.proceduresPreviewImages}
                    style={{backgroundColor: index === imgNo ? '#6cab44' : '#80808091'}}
                    onClick={() => setImgNo(index)}>
                    {batch.map(image => <img key={image}
                                             src={toWebp(`/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`)}
                                             alt={`${services[serviceId]?.procedures[procedureIndex]?.title || 'Procedură dentară'} - previzualizare caz înainte-după`}
                    />)}
                  </div>
                ))}
              </div>
              {renderScrollIndicator()}

            </div>}
            {cazuri?.length && <>
              {cazuri[indexCaz].images[imgNo].length === 3 &&
                <ThreeLayerImageComparator height={500}
                                           images={cazuri[indexCaz].images[0].map(image => toWebp(`/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`))}
                                           showDeviderLabel={handleShowDeviderLabel()}
                                           altText={services[serviceId]?.procedures[procedureIndex]?.title || 'Procedură dentară'}/>}
              {cazuri[indexCaz].images[imgNo].length === 2 &&
                <ImageComparator
                  images={cazuri[indexCaz].images[imgNo].map(image => toWebp(`/images/${cazuri[indexCaz]?.dirPath}/thumbnail_${image}`))}
                  //showCursor={false}
                  maxWidth={850}
                  altText={services[serviceId]?.procedures[procedureIndex]?.title || 'Procedură dentară'}
                />}
            </>
            }
            <CaseNavControls
              current={indexCaz + 1}
              total={cazuri?.length}
              onPrev={handleNavPrev}
              onNext={handleNavNext}
              showTouchHint={Boolean(cazuri?.length && cazuri[indexCaz].images[imgNo].length > 2)}
            />
          </div>
          <div className='p-2'>
            <h2>Cum se realizează inserarea implanturilor?</h2>
            <div
              className='services-container-description'
              dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}
            ></div>
            <TreatmentAttribution />
            <MedicalDisclaimer />
            <div className='mt-3'>
              <IconLink label='Vezi rezultate reale de implantologie' href='/rezultate/implantologie'>
                <TfiHandPointLeft size='1.5rem' color='#6cab44' style={{ cursor: 'pointer', transform: 'scaleX(-1)' }}/>
              </IconLink>
            </div>
            <TarifeLink />
          </div>
        </div>
      </div>
    </div>
  );
};

InserareImplantAditiiOs.seo = {
  title: "Inserare implanturi și adiții de os | Olidental Timișoara",
  description: "Inserare de implanturi dentare și adiții de os la Olidental Clinic Timișoara, realizate chirurgical în urma unei evaluări CT a substratului osos.",
  canonical: "https://olidental.ro/inserare-implant-aditii-os",
};

export default InserareImplantAditiiOs;