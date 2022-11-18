import { useEffect } from 'react';
import { useState, useRef } from 'react';
import styles from './styles/styles.module.css';

const ImageComparator = ({ images, maxWidth = 400 }) => {
  const [imgClip, setImgClip] = useState(['0% 0, 100% 0, 100% 100%, 0% 100%', '50% 0, 100% 0, 100% 100%, 50% 100%']);

  const [deviderGrab, setDeviderGrab] = useState(false);

  const [deviderHeight, setDeviderHeight] = useState();

  const [deviderXPos, setDeviderXPos] = useState(200);

  const imageRef = useRef();

  useEffect(() => {
    setDeviderHeight(imageRef.current.clientHeight);
    setDeviderXPos(imageRef.current.clientWidth/2)
    console.dir(imageRef.current)
  }, []);

  const handleDeviderMove = (e) => {
    let cursorXPos = null;
    if(e.clientX)cursorXPos = e.clientX;
    else if(e.touches)cursorXPos = e.touches[0].pageX;
    if (deviderGrab && cursorXPos - imageRef.current.x >= 2 && cursorXPos - imageRef.current.x <= maxWidth - 3) {
      console.log(cursorXPos - imageRef.current.x, ((cursorXPos - imageRef.current.x) * 100) / 400);
      const xPosProc = ((cursorXPos - imageRef.current.x) * 100) / imageRef.current.clientWidth;
      setDeviderXPos(cursorXPos - imageRef.current.x);
      setImgClip(([`${100-xPosProc}% 0, 100% 0, 100% 100%, ${100-xPosProc}% 100%'`, `${xPosProc}% 0, 100% 0, 100% 100%, ${xPosProc}% 100%`]))
    }
  };

  console.log(deviderHeight)

  return (
    <div style={{ maxWidth }} className={styles.imageComparatoContainer} onMouseMove={handleDeviderMove} onTouchMove={handleDeviderMove}>
      {images.map((image, index) => (
        <img key={image + index} src={image} alt="before/after" width={'100%'} style={{ clipPath: `polygon(${imgClip[index]})` }} ref={imageRef} />
      ))}
      <div
        style={{ width: 2, height: deviderHeight, left: deviderXPos }}
        className={styles.imageComparatoImageDevider}
      >
        <div 
        style={{cursor: deviderGrab ? 'grabbing' : 'grab'}}
        className={styles.imageComparatorGrabArea}
        onMouseDown={() => setDeviderGrab(true)}
        onMouseUp={() => setDeviderGrab(false)}
        onTouchStart={() => setDeviderGrab(true)}
        onTouchEnd={() => setDeviderGrab(false)}>
            <div>&#x21d5;</div>
        </div>
      </div>
    </div>
  );
};

export default ImageComparator;
