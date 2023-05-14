import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CustomCarousel = ({ showThumbs = true, showIndicators = false, showArrows = true, interval=5000, children }) => {
  return (
    <Carousel
      stopOnHover={false}
      showThumbs={showThumbs}
      showIndicators={showIndicators}
      dynamicHeight={false}
      infiniteLoop
      autoPlay={true}
      showStatus={false}
      interval={interval}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
      showArrows={showArrows}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
