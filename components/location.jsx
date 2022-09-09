import styles from './styles/styles.module.css';
import { MdLocationOn, MdOutlineMail, MdPhone } from "react-icons/md";

const Location = () => {
  return (
    <div className="w-100 mt-5 mb-5">
      <div className={`${styles['custom-icon-contact-container']} d-flex justify-content-evenly mb-5`}>
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdLocationOn style={{fill: '#4caf50'}}/>
          </div>
          <div style={{ color: '#807f89' }}>
            Strada Ștefan cel Mare 53
            <br />
            Timișoara 307200
          </div>
        </div>
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdOutlineMail style={{fill: '#4caf50'}}/>
          </div>
          <div style={{ color: '#807f89' }}>office@olidental.ro</div>
        </div>
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdPhone style={{fill: '#4caf50'}}/>
          </div>
          <div style={{ color: '#807f89' }}>
            +40 733.023.030
          </div>
        </div>
      </div>
      <div className="ps-5 pe-5 w-100">
        <iframe
          width="100%"
          height="400"
          id="gmap_canvas"
          src="https://maps.google.com/maps?q=Strada%20%C8%98tefan%20cel%20Mare%2053&t=&z=17&ie=UTF8&iwloc=&output=embed"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;

//<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Strada%20%C8%98tefan%20cel%20Mare%2053&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://putlocker-is.org"></a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net">using google maps on websites</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>