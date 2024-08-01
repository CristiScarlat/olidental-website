//import CustomCarousel from '../components/carousel';
import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';
import { carouselPicsHome, smilesGallery } from '../utils/uiConstants';
import CustomCard from '../components/customCard';
import Link  from "next/link";

import dynamic from 'next/dynamic'
const Home = () => {

  const carouselContainerStyle = {
    maxWidth: '62rem'
    //border: '1px solid gray',
    //padding: '1rem',
    //backgroundColor: '#8a8a8a'
  };

  const DynamicCarousel = dynamic(() => import('../components/carousel'))

  return (
    <>
      <div className='bg-gray carousel-wrapper'>
        <div className='m-auto' style={carouselContainerStyle}>
          <DynamicCarousel showThumbs={false}>
            {carouselPicsHome.map(pic => (
              <div key={pic}>
                <img src={`images/carouselHome/thumbnail_${pic}`} alt='carousel item 1' style={{ borderRadius: 10 }} />
                {/* <CarouselLegendContent index={0} /> */}
              </div>
            ))}
          </DynamicCarousel>
        </div>
      </div>

        <Link href="/rezultate" legacyBehavior>
          <div className="band-with-label">
            {/*<img src="/images/logos/reabilitari.png.webp" style={{maxWidth: "8rem"}}/>*/}
            Rezultate
            <div className="d-flex gap-3 w-100 overflow-auto justify-content-center">
            {smilesGallery.images.filter((photo, index) => index <= 2).map(pic => (
                <img key={`/images/services/${smilesGallery.dirPath}/${pic}`} src={`/images/services/${smilesGallery.dirPath}/${pic}`} alt={pic} style={{ borderRadius: 10, width: 150 }} />
            ))}
            </div>
          </div>
        </Link>

      {/*<div className="band-with-label">*/}
      {/*  <Link href="/rezultate">Mergi la Rezultate</Link>*/}
      {/*</div>*/}
      {/*<div className="row d-flex justify-content-center p-3">*/}
      {/*<CustomCard*/}
      {/*  id="rezultate"*/}
      {/*  onClick={handleRedirect}*/}
      {/*  imgSrc="/images/logos/zambet.png.webp"*/}
      {/*  title="Rezultate"*/}
      {/*  imgStyle={{maxWidth: 100, margin: "2rem"}}*/}
      {/*/>*/}
      {/*</div>*/}
      {/*<div id='services'><Services /></div>*/}
      {/*<div id='team'><Specialists /></div>*/}
      <div id='contact'><Location className="pt-3 pb-3 bg-gray"/></div>
    </>
  );
};

export default Home;
