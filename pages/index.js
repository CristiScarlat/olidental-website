import CustomCarousel from '../components/carousel';
import Specialists from '../components/specialists';
import Services from '../components/services';
import Location from '../components/location';

export default function Home() {
  return (
    <>
        <CustomCarousel showThumbs={false} />
        <Services />
        <Specialists />
        <Location />
    </>
  )
}
