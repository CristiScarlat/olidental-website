import { useState, useRef, useEffect } from 'react';
import Spinner from './spinner';
import { BsHandIndexThumb } from 'react-icons/bs';
import styles from './styles/styles.module.css';

const ThreeLayerImageComparator = ({ images = [], maxWidth = 400 }) => {
  const [imgClip, setImgClip] = useState(['0% 0px, 33% 0px, 33% 100%, 0% 100%', '33% 0px, 66% 0px, 66% 100%, 33% 100%', '66% 0, 100% 0, 100% 100%, 66% 100%']);

  const [deviderHeight, setDeviderHeight] = useState();

  const [deviderLeftXPos, setDeviderLeftXPos] = useState(200);
  const [deviderRightXPos, setDeviderRightXPos] = useState(200);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedImages, setSelectedImages] = useState([0, 1, 2])

  const imageRef = useRef();
  const hoveredImg = useRef();
  const loadedImages = useRef([]);

  useEffect(() => {
      setDeviderHeight(imageRef.current?.clientHeight);
      setDeviderLeftXPos(imageRef.current?.clientWidth * 33 / 100);
      setDeviderRightXPos(imageRef.current?.clientWidth * 66 / 100);
  }, [imgLoaded]);

  const handleImgOnLoad = (imageSrc) => {
    loadedImages.current.push(imageSrc);
    if (loadedImages.current.length === 2) {
      setImgLoaded(true);
    }
  };

  const handleHover = (status, imageIndex) => {
    if(status === 'enter'){
      hoveredImg.current = imageIndex;
      const temp = [...imgClip];
      temp[imageIndex] = '0% 0, 100% 0, 100% 100%, 0% 100%';
      setImgClip(temp);
      if(imageIndex === 0){
        setDeviderLeftXPos(imageRef.current?.clientWidth);
        setDeviderRightXPos(imageRef.current?.clientWidth);
        setSelectedImages([0, null, null]);

      }
      else if(imageIndex === 1){
        setDeviderLeftXPos(0);
        setDeviderRightXPos(imageRef.current?.clientWidth);
        setSelectedImages([null, 1, null]);
      }
      else if(imageIndex === 2){
        setDeviderLeftXPos(0);
        setDeviderRightXPos(0);
        setSelectedImages([null, null, 2]);
      }
    }
    else if(status === 'leave'){
      setImgClip(['0% 0px, 33% 0px, 33% 100%, 0% 100%', '33% 0px, 66% 0px, 66% 100%, 33% 100%', '66% 0, 100% 0, 100% 100%, 66% 100%']);
      setDeviderLeftXPos(imageRef.current?.clientWidth * 33 / 100);
      setDeviderRightXPos(imageRef.current?.clientWidth * 66 / 100);
      setSelectedImages([0, 1, 2]);
    }
  }

  return (
    <div className='mb-2 ms-2 me-2'>
      <div style={{ visibility: imgLoaded ? 'visible' : 'hidden', margin: 'auto', height: `${deviderHeight}px` }}
           className={styles.imageComparatoContainer}
          >
        {images?.map((image, index) => (
          <img
            key={image}
            src={image}
            alt='before/after-3layer'
            style={{
              clipPath: `polygon(${imgClip[index]})`,
              maxHeight: '400px',
              objectFit: 'cover',
              top: 0,
              position: 'absolute',
              transition: 'clip-path 1s ease',
              zIndex: index === hoveredImg.current ? 1 : 0
            }}
            ref={imageRef}
            loading='lazy'
            onLoad={() => handleImgOnLoad(image)}
            onMouseEnter={() => handleHover('enter', index)}
            onMouseOut={() => handleHover('leave', index)}
            onTouchStart={() => handleHover('enter', index)}
            onTouchEnd={() => handleHover('leave', index)}
          />
        ))}
        <div style={{ width: 2, height: deviderHeight, left: deviderLeftXPos, transition: 'left 1s ease'}}
             className={styles.imageComparatoImageDevider}/>
        <div style={{ width: 2, height: deviderHeight, left: deviderRightXPos, transition: 'left 1s ease'}}
             className={styles.imageComparatoImageDevider}/>

        <div className="mx-2 outline-text" style={{position: 'absolute', color: 'white', bottom: 0, left: '0', transition: 'left 1s ease', zIndex: 2, display: selectedImages[0] === 0 ? 'initial' : 'none'}}>înainte</div>
        <div className="mx-2 outline-text" style={{position: 'absolute', color: 'white', bottom: 0, left: deviderLeftXPos, transition: 'left 1s ease', zIndex: 2, display: selectedImages[1] === 1 ? 'initial' : 'none'}}>în lucru</div>
        <div className="mx-2 outline-text" style={{position: 'absolute', color: 'white', bottom: 0, left: deviderRightXPos, transition: 'left 1s ease', zIndex: 2, display: selectedImages[2] === 2 ? 'initial' : 'none'}}>după</div>
          {/*<div*/}
          {/*  style={{ cursor: deviderGrab ? 'grabbing' : 'grab' }}*/}
          {/*  className={styles.imageComparatorGrabArea}*/}
          {/*  onMouseDown={() => setDeviderGrab(true)}*/}
          {/*  onMouseUp={() => setDeviderGrab(false)}*/}
          {/*  onTouchStart={() => setDeviderGrab(true)}*/}
          {/*  onTouchEnd={() => setDeviderGrab(false)}*/}
          {/*>*/}
          {/*  <BsHandIndexThumb />*/}
          {/*</div>*/}
      </div>
    </div>
  );
};

export default ThreeLayerImageComparator;
