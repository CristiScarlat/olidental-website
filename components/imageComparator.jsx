import { useState, useRef, useEffect } from 'react';
import Spinner from './spinner';
import { MdArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { PiHandSwipeLeftBold, PiHandSwipeRightBold } from 'react-icons/pi';
import { MdOutlineSwipe } from "react-icons/md";
import styles from './styles/styles.module.css';

const ImageComparator = ({ images, maxWidth = 400, height = 225, showCursor=true }) => {
  const [imgClip, setImgClip] = useState(['0% 0, 100% 0, 100% 100%, 0% 100%', '50% 0, 100% 0, 100% 100%, 50% 100%']);

  const [deviderGrab, setDeviderGrab] = useState(false);

  const [deviderHeight, setDeviderHeight] = useState();

  const [deviderXPos, setDeviderXPos] = useState(200);

  //const [imgLoaded, setImgLoaded] = useState(false);

  const imgLoaded = true;
  const setImgLoaded = () => {}

  const imageRef = useRef();
  const loadedImages = useRef([]);

  useEffect(() => {
    setDeviderHeight(imageRef.current.clientHeight || 200);
    setDeviderXPos(imageRef.current.clientWidth / 2);
    setImgClip(['0% 0, 100% 0, 100% 100%, 0% 100%', '50% 0, 100% 0, 100% 100%, 50% 100%']);
  }, [images]);

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
    setDeviderHeight(imageRef.current.clientHeight || 200);
    setDeviderXPos(imageRef.current.clientWidth / 2);
    loadedImages.current.push(imageSrc);
    if (loadedImages.current.length === 2) {
      setImgLoaded(true);
    }
  };

  const handleHover = (status, imageIndex) => {
    if(status === 'enter' && !showCursor){
      //hoveredImg.current = imageIndex;
      const temp = [...imgClip];

      if(imageIndex === 0){
        setDeviderXPos(imageRef.current?.clientWidth);
        setImgClip(['0% 0, 100% 0, 100% 100%, 0% 100%', '100% 0, 100% 0, 100% 100%, 100% 100%']);
      }
      else if(imageIndex === 1){
        setDeviderXPos(0);
        setImgClip(['0% 0, 100% 0, 100% 100%, 0% 100%', '0% 0, 100% 0, 100% 100%, 0% 100%']);
      }
    }
    else if(status === 'leave' && !showCursor){
      setImgClip(['0% 0, 100% 0, 100% 100%, 0% 100%', '50% 0, 100% 0, 100% 100%, 50% 100%']);
      setDeviderXPos(imageRef.current.clientWidth / 2);
    }
  }

  return (
    <div className="mb-2 ms-2 me-2" style={{height: deviderHeight, border: '2px solid #80808042', borderWidth: '0 2px'}}>
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
            style={{ userSelect: 'none', clipPath: `polygon(${imgClip[index]})`, maxWidth: maxWidth, height: null, objectFit: 'contain', transition: showCursor ? null : 'clip-path 1s ease' }}
            ref={imageRef}
            loading="lazy"
            onLoad={() => handleImgOnLoad(image)}
            onMouseEnter={() => handleHover('enter', index)}
            onMouseOut={() => handleHover('leave', index)}
            onTouchStart={() => handleHover('enter', index)}
            onTouchEnd={() => handleHover('leave', index)}
          />
        ))}
        <div style={{ width: 2, height: deviderHeight, left: deviderXPos, transition: showCursor ? null : 'left 1s ease'}} className={styles.imageComparatoImageDevider}>
          {showCursor && <div
            style={{ cursor: deviderGrab ? 'grabbing' : 'grab' }}
            className={styles.imageComparatorGrabArea}
            onMouseDown={() => setDeviderGrab(true)}
            onMouseUp={() => setDeviderGrab(false)}
            onTouchStart={() => setDeviderGrab(true)}
            onTouchEnd={() => setDeviderGrab(false)}
          >
            {/* <div>&#x21d5;</div> */}
            <MdArrowBackIosNew color="white" size="1rem"/>
            <MdOutlineSwipe color="white" size="2.5rem" />
            <MdOutlineArrowForwardIos color="white" size="1rem"/>
          </div>}
        </div>
      </div>
      <div
        className="d-flex justify-content-center align-items-center m-auto"
        style={{
          maxWidth: maxWidth,
          //height: height,
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
