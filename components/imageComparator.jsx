import { useState, useRef, useEffect } from 'react';
import Spinner from './spinner';
import { BsHandIndexThumb } from 'react-icons/bs';
import styles from './styles/styles.module.css';

const ImageComparator = ({ images, maxWidth = 400 }) => {
  const [imgClip, setImgClip] = useState(['0% 0, 100% 0, 100% 100%, 0% 100%', '50% 0, 100% 0, 100% 100%, 50% 100%']);

  const [deviderGrab, setDeviderGrab] = useState(false);

  const [deviderHeight, setDeviderHeight] = useState();

  const [deviderXPos, setDeviderXPos] = useState(200);

  const [imgLoaded, setImgLoaded] = useState(false);

  const imageRef = useRef();
  const loadedImages = useRef([]);

  useEffect(() => {
    setDeviderHeight(imageRef.current.clientHeight || 200);
    setDeviderXPos(imageRef.current.clientWidth / 2);
  }, []);

  const handleDeviderMove = (e) => {
    const clientRectObj = imageRef.current.getBoundingClientRect();
    const imagePosX = Math.ceil(clientRectObj.x);
    if (deviderGrab && e.clientX - imagePosX >= 2 && e.clientX - imagePosX <= maxWidth - 3) {
      const xPosProc = ((e.clientX - imagePosX) * 100) / imageRef.current.clientWidth;
      setDeviderXPos(e.clientX - imagePosX);
      setImgClip([`${100 - xPosProc}% 0, 100% 0, 100% 100%, ${100 - xPosProc}% 100%'`, `${xPosProc}% 0, 100% 0, 100% 100%, ${xPosProc}% 100%`]);
    }
  };
  const handleDeviderMoveOnTouch = (e) => {
    const cursorXPos = e.touches[0].clientX - imageRef.current.x / 2;
    const imageWidth = imageRef.current.clientWidth;
    if (deviderGrab && cursorXPos >= 2 && cursorXPos <= imageWidth - 3) {
      const xPosProc = (cursorXPos * 100) / imageRef.current.clientWidth;
      setDeviderXPos(cursorXPos);
      setImgClip([`${100 - xPosProc}% 0, 100% 0, 100% 100%, ${100 - xPosProc}% 100%'`, `${xPosProc}% 0, 100% 0, 100% 100%, ${xPosProc}% 100%`]);
    }
  };

  const handleImgOnLoad = (imageSrc) => {
    loadedImages.current.push(imageSrc);
    if (loadedImages.current.length === 2) {
      setImgLoaded(true);
    }
  };

  return (
    <div className="mb-2">
      <div
        style={{ maxWidth, maxHeight: 225, visibility: imgLoaded ? 'visible' : 'hidden', margin: 'auto' }}
        className={styles.imageComparatoContainer}
        onMouseMove={handleDeviderMove}
        onTouchMove={handleDeviderMoveOnTouch}
        onMouseDown={() => setDeviderGrab(true)}
        onMouseUp={() => {
          if (deviderGrab) setDeviderGrab(false);
        }}
      >
        {images.map((image, index) => (
          <img
            key={image + index}
            src={image}
            alt="before/after"
            style={{ clipPath: `polygon(${imgClip[index]})`, maxWidth: maxWidth, height: 225, objectFit: 'cover' }}
            ref={imageRef}
            loading="lazy"
            onLoad={() => handleImgOnLoad(image)}
          />
        ))}
        <div style={{ width: 2, height: deviderHeight, left: deviderXPos }} className={styles.imageComparatoImageDevider}>
          <div
            style={{ cursor: deviderGrab ? 'grabbing' : 'grab' }}
            className={styles.imageComparatorGrabArea}
            onMouseDown={() => setDeviderGrab(true)}
            onMouseUp={() => setDeviderGrab(false)}
            onTouchStart={() => setDeviderGrab(true)}
            onTouchEnd={() => setDeviderGrab(false)}
          >
            {/* <div>&#x21d5;</div> */}
            <BsHandIndexThumb />
          </div>
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center m-auto"
        style={{
          maxWidth: maxWidth,
          height: 225,
          visibility: imgLoaded ? 'hidden' : 'visible',
          border: '1px solid gray',
          textAlign: 'center',
          backgroundColor: '#6cab44'
        }}
      >
        <Spinner variant="light" />
      </div>
    </div>
  );
};

export default ImageComparator;
