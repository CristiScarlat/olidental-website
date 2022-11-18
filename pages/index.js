import CustomCarousel from '../components/carousel';
import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';

const Home = () => {
  return (
    <>
        <CustomCarousel showThumbs={false} />
        <div id="services"><Services /></div>
        <div id="team"><Specialists /></div>
        <div id="contact"><Location /></div>
    </>
  )
}

export default Home;
