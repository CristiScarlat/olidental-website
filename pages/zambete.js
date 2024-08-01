import { smilesGallery } from '../utils/uiConstants';
import CustomCarousel from '../components/carousel';
import styles from '../styles/galery.module.css';


const SlideGallery = () => {
  return (
    <div className={styles.smilesGalleryWrapper}>
      <CustomCarousel>
        {smilesGallery.images.map(pic => (
          <div key={pic}>
            <img src={`/images/services/${smilesGallery.dirPath}/${pic}`} alt='carousel item 1' style={{ borderRadius: 10 }} />
            {/* <CarouselLegendContent index={0} /> */}
          </div>
        ))}
      </CustomCarousel>
    </div>
  );
};

export default SlideGallery;