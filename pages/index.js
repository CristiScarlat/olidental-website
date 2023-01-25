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
        <div className="m-auto" style={carouselContainerStyle}><CustomCarousel showThumbs={false} /></div>
      </div>
      <div id="services"><Services /></div>
      <div id="team"><Specialists /></div>
      <div id="contact"><Location /></div>
    </>
  )
}

export default Home;
