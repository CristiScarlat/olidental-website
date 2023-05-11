import CustomCarousel from '../components/carousel';
import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';

const Home = () => {

  const carouselContainerStyle = {
    maxWidth: '62rem',
    //border: '1px solid gray',
    //padding: '1rem',
    //backgroundColor: '#8a8a8a'
  }

  return (
    <>
      <div className="bg-gray carousel-wrapper">
        <div className="m-auto" style={carouselContainerStyle}>
          <CustomCarousel showThumbs={false} showArrows={false}>
            <div>
              <img src="images/carousel/1.jpg" alt="carousel item 1" style={{ borderRadius: 10 }} />
              {/* <CarouselLegendContent index={0} /> */}
            </div>
            <div>
              <img src="images/carousel/2.jpg" alt="carousel item 2" style={{ borderRadius: 10 }} />
              {/* <CarouselLegendContent index={1} /> */}
            </div>
            <div>
              <img src="images/carousel/3.jpg" alt="carousel item 3" style={{ borderRadius: 10 }} />
              {/* <CarouselLegendContent index={2} /> */}
            </div>
          </CustomCarousel>
        </div>
      </div>
      <div id="services"><Services /></div>
      <div id="team"><Specialists /></div>
      <div id="contact"><Location /></div>
    </>
  )
}

export default Home;
