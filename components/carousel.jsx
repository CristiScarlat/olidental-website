import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CustomCarousel = ({ showThumbs = true, showIndicators = false, children }) => {
  return (
    <Carousel
      stopOnHover={false}
      showThumbs={showThumbs}
      showIndicators={showIndicators}
      dynamicHeight={true}
      infiniteLoop
      autoPlay={false}
      showStatus={false}
      interval={5000}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
