import CustomCarousel from '../components/carousel';
import Services from '../components/services';
import { carouselPicsServices } from '../utils/uiConstants';

const ServicesPage = () => {

  return (
    <>
      <div className='d-flex justify-content-center m-3'>
        <div style={{maxWidth: "50rem"}}>
          <CustomCarousel showThumbs={false}>
            {carouselPicsServices.map(pic => (
              <div key={pic}>
                <img src={`images/carouselServices/thumbnail_${pic}`} alt='carousel item 1' style={{ borderRadius: 10 }} />
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
