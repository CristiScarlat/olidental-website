import styles from './styles/styles.module.css';
import { MdLocationOn, MdOutlineMail, MdPhone } from "react-icons/md";

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
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdOutlineMail style={{fill: '#4caf50'}}/>
          </div>

            <a style={{ color: '#807f89', height: 'auto', whiteSpace: 'nowrap', width: 'fit-content!important' }} href="email:office@olidental.ro">
              office@olidental.ro
            </a>

        </div>
        <div className={styles['custom-icon-contact']}>
          <div style={{ width: '100px' }}>
            <MdPhone style={{fill: '#4caf50'}}/>
          </div>

            <a style={{ color: '#807f89', height: 'auto', whiteSpace: 'nowrap', width: 'fit-content!important' }} href="tel:+40 733.023.030">+40 733.023.030</a>
        
        </div>
      </div>
      <div className="ps-5 pe-5 w-100">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2783.9932384952626!2d21.2523657!3d45.7512815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745679c71dd9307%3A0xa38a47dc4d8638f8!2sOlidental%20Clinic!5e0!3m2!1sen!2sro!4v1666078254839!5m2!1sen!2sro" 
      width="100%" 
      height="450" 
      style={{border: 0}}
      allowFullScreen="" 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade">
      </iframe>
      </div>
    </div>
  );
};

export default Location;

//<div class="mapouter"><div class="gmap_canvas"><iframe width="600" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=Strada%20%C8%98tefan%20cel%20Mare%2053&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://putlocker-is.org"></a><br><style>.mapouter{position:relative;text-align:right;height:500px;width:600px;}</style><a href="https://www.embedgooglemap.net">using google maps on websites</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}</style></div></div>