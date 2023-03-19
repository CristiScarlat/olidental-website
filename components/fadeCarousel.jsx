import { useEffect, useRef, useState } from 'react';
import { GiClick } from 'react-icons/gi';

const FadeCarousel = ({ images, path }) => {
  const [imagesIndex, setImagesIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState();
  const [showClickIndicator, setShowClickIndicator] = useState(true);

  const imageContainerRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      handleChangeImages();
    }, 30000);
    return () => clearInterval(id);
  });
  const handleChangeImages = (e) => {
    setImagesIndex((state) => {
      if (state === 5) return 0;
      else return state + 1;
    });
    setContainerHeight(imageContainerRef.current?.height);
    if (showClickIndicator) setShowClickIndicator(false);
  };

  return (
    <>
      <div className="mb-1 d-flex flex-column" style={{ position: 'relative', height: containerHeight || '12rem' }} onClick={handleChangeImages}>
        {images?.map((batch, index) => (
          <div
            key={index}
            className="d-flex gap-md-2"
            style={{
              opacity: imagesIndex === index ? '1' : '0',
              position: 'absolute',
              top: 0,
              transition: 'opacity 1s'
            }}
          >
            {showClickIndicator && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(50% - 2rem)',
                  right: 'calc(50% - 2rem)'
                }}
              >
                <GiClick size="4rem" color="white" />
              </div>
            )}
            {batch.map((image, index) => (
              <div key={image + index}>
                <img src={`${path}thumbnail_${image}`} className="procedure-cazuri-img" ref={imageContainerRef} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default FadeCarousel;
