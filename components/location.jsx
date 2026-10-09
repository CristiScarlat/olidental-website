import { useState } from 'react';
import styles from './styles/styles.module.css';
import { MdLocationOn, MdOutlineMail, MdPhone, MdAccessTime } from "react-icons/md";
import { GOOGLE_MAPS_URL } from '../utils/schema';

const MAP_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2783.9932384952626!2d21.2523657!3d45.7512815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745679c71dd9307%3A0xa38a47dc4d8638f8!2sOlidental%20Clinic!5e0!3m2!1sen!2sro!4v1666078254839!5m2!1sen!2sro';
const MAP_HEIGHT = 450;

// The Google map loads only after a click: it is about 450 KB and 16 requests,
// and Google sets its own cookies, which needs the visitor's go-ahead.
const ClickToLoadMap = () => {
  const [showMap, setShowMap] = useState(false);

  if (showMap) {
    return (
      <iframe
        src={MAP_EMBED_URL}
        title="Harta Olidental Clinic pe Google Maps"
        width="100%"
        height={MAP_HEIGHT}
        style={{ border: 0 }}
        allowFullScreen=""
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center gap-3 p-4"
      style={{ height: MAP_HEIGHT, background: '#e2e2e2', borderRadius: 10, color: '#4d4d4d' }}
    >
      <MdLocationOn size={48} style={{ fill: '#4caf50' }} aria-hidden="true" />
      <p className="m-0">Strada Ștefan cel Mare 53, Timișoara (intrare de pe Gh. Asachi)</p>
      <button type="button" className="btn btn-success" onClick={() => setShowMap(true)}>
        Afișează harta
      </button>
      <small>Harta este oferită de Google, care poate seta cookie-uri la afișare.</small>
      <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Deschide în Google Maps</a>
    </div>
  );
};

const Location = ({className=""}) => {
  return (
    <div className={`w-100 mb-5 ${className}`}>
      <div className={`${styles['custom-icon-contact-container']} d-flex justify-content-evenly mb-5`}>
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdLocationOn style={{fill: '#4caf50'}}/>
          </div>
          <div style={{ color: '#807f89' }}>
            Strada Ștefan cel Mare 53 Parter<br/>
            (intrare de pe Gh. Asachi)
            <br />
            Timișoara 307200
          </div>
        </div>
        <a
          href="mailto:clinica@olidental.ro"
          className={`${styles['custom-icon-contact']} ${styles['custom-icon-contact-link']}`}
          style={{ color: '#807f89' }}
        >
          <div style={{ width: '100px' }}>
            <MdOutlineMail style={{fill: '#4caf50'}}/>
          </div>
          <span style={{ height: 'auto', whiteSpace: 'nowrap' }}>
            clinica@olidental.ro
          </span>
        </a>
        <a
          href="tel:+40733023030"
          className={`${styles['custom-icon-contact']} ${styles['custom-icon-contact-link']}`}
          style={{ color: '#807f89' }}
        >
          <div style={{ width: '100px' }}>
            <MdPhone style={{fill: '#4caf50'}}/>
          </div>
          <span style={{ height: 'auto', whiteSpace: 'nowrap' }}>+40 733.023.030</span>
        </a>
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdAccessTime style={{fill: '#4caf50'}}/>
          </div>
          <div style={{ color: '#807f89' }}>
            Luni – Vineri: 09:30 – 18:30<br/>
            Sâmbătă, Duminică: închis
          </div>
        </div>
      </div>
      <div className="ps-5 pe-5 w-100">
        <ClickToLoadMap />
      </div>
    </div>
  );
};

export default Location;

//<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Strada%20%C8%98tefan%20cel%20Mare%2053&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://putlocker-is.org"></a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net">using google maps on websites</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>