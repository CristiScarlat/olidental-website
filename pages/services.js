import CustomCarousel from '../components/carousel';
import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';
import { carouselPicsServices } from '../utils/uiConstants';
import CustomCard from '../components/customCard';
import Link from 'next/link';

const ServicesPage = () => {

  return (
    <>
      <hr />
      <div className='d-flex justify-content-center m-3'>
        <div style={{maxWidth: "50rem"}}>
          <CustomCarousel showThumbs={false}>
            {carouselPicsServices.map(pic => (
              <div key={pic}>
                <img src={`images/carouselServices/thumbnail_${pic}`} alt='carousel item 1' style={{ borderRadius: 10 }} />
                {/* <CarouselLegendContent index={0} /> */}
              </div>
            ))}
          </CustomCarousel>
        </div>
      </div>
      <Services />
    </>
  );
};

export default ServicesPage;
