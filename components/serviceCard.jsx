import { Accordion } from 'react-bootstrap';

const ServiceCard = ({ imgSrc, imgStyle, title, body, activeKey }) => {
  return (
    <Accordion.Item eventKey={activeKey}>
      {/*<div className="row p-4">*/}
      {/*<div className="col d-flex align-items-center justify-content-center icon m-auto">*/}
      {/*  <img src={imgSrc} alt="..." style={imgStyle} />*/}
      {/*</div>*/}

      {/*<div className="col-md-9 detail m-auto text-sm-start text-md-center">*/}
      <Accordion.Header>
        <div className="d-flex align-items-center p-3 w-100">
          <img src={imgSrc} alt="..." style={{ width: 30, marginRight: '0.5rem' }} />
          <span className="text-black-50">{title}</span>
        </div>
      </Accordion.Header>
      <Accordion.Body dangerouslySetInnerHTML={{ __html: body }}></Accordion.Body>
      {/*</div>*/}
      {/*</div>*/}
    </Accordion.Item>
  );
};

export default ServiceCard;
