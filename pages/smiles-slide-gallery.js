import ImageGallery from 'react-image-gallery';
import styles from '../styles/Galery.module.css';
import { smilesGallery } from '../utils/uiConstants';


const images = smilesGallery.images.map(image => {
  return  {
    original: `/images/services/${smilesGallery.dirPath}/${image}`,
    thumbnail: `/images/services/${smilesGallery.dirPath}/${image}`,
  }
});


const SlideGallery = () => {
  return (
    <div className='' style={{ backgroundColor: '#d4d4d4' }}>
        <ImageGallery
          additionalClass={styles.imageGallerySlide}
          style={{maxWidth: '70rem', margin: 'auto'}}
          items={images}
          lazyLoad={true}
          thumbnailPosition="top"/>
    </div>
  );
};

export default SlideGallery;