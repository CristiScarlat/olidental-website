import { useEffect, useState } from 'react';
import Link from 'next/link';

const CustomCard = ({ id, link, title, body, imgSrc, imgStyle }) => {
  const [bodyContent, setBodyContent] = useState();
  //to avoid hydration error
  useEffect(() => {
    setBodyContent(body);
  }, []);

  return (
    <Link href={link} legacyBehavior>
      <a className="text-center custom-card-container" style={{ cursor: 'pointer' }}>
        <div className="service-sec">
          <div className="d-flex align-items-center justify-content-center icon m-auto">
            <img src={imgSrc} alt={title} style={imgStyle} />
          </div>

          <div className="detail m-auto">
            <h3 style={{fontWeight: 600}}>{title}</h3>
            <p dangerouslySetInnerHTML={{ __html: bodyContent }}></p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CustomCard;
