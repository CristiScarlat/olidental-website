import { useEffect, useState } from 'react';

const CustomCard = ({ onClick, id, title, body, imgSrc, imgStyle }) => {
  const [bodyContent, setBodyContent] = useState();
  //to avoid hydration error
  useEffect(() => {
    setBodyContent(body);
  }, []);

  return (
    <div className="col-md-4 text-center custom-card-container" onClick={() => onClick(id)} style={{ cursor: 'pointer' }}>
      <div className="service-sec">
        <div className="d-flex align-items-center justify-content-center icon m-auto">
          <img src={imgSrc} alt="..." style={imgStyle} />
        </div>

        <div className="detail m-auto">
          <h5>{title}</h5>
          <p dangerouslySetInnerHTML={{ __html: bodyContent }}></p>
        </div>
      </div>
      {/*<button className="read-more-button" onClick={() => onClick(id)}>*/}
      {/*  Află mai mult*/}
      {/*</button>*/}
    </div>
  );
};

export default CustomCard;
