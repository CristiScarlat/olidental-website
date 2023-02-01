import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CustomCarousel = ({ showThumbs=true, showIndicators=false }) => {
  return (
    <Carousel
      stopOnHover={false}
      showThumbs={showThumbs}
      showIndicators={showIndicators}
      dynamicHeight={true}
      infiniteLoop
      autoPlay={true}
      showStatus={false}
      interval={5000}
      preventMovementUntilSwipeScrollTolerance={true}
      swipeScrollTolerance={50}
    >
      <div>
        <img src="images/carousel/1.jpg" alt="carousel item 1"  style={{borderRadius: 10}}/>
        {/* <CarouselLegendContent index={0} /> */}
      </div>
      <div>
        <img src="images/carousel/2.jpg" alt="carousel item 2"  style={{borderRadius: 10}}/>
        {/* <CarouselLegendContent index={1} /> */}
      </div>
      <div>
        <img src="images/carousel/3.jpg"  alt="carousel item 3"  style={{borderRadius: 10}}/>
        {/* <CarouselLegendContent index={2} /> */}
      </div>
      <div>
        <img src="images/carousel/4.jpg" alt="carousel item 4"  style={{borderRadius: 10}}/>
        {/* <CarouselLegendContent index={2} /> */}
      </div>
      <div>
        <img src="images/carousel/5.jpg" alt="carousel item 5"  style={{borderRadius: 10}}/>
        {/* <CarouselLegendContent index={2} /> */}
      </div>
      <div>
        <img src="images/carousel/6.jpg" alt="carousel item 6"  style={{borderRadius: 10}}/>
        {/* <CarouselLegendContent index={2} /> */}
      </div>
    </Carousel>
  );
};

export default CustomCarousel;
