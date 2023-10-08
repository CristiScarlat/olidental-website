import { BsHandIndexThumb, BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import styles from "./styles/styles.module.css";
const ScrollIndicator = () => {

  return(
    <div className={`${styles.scrollIndicatorAnim} d-flex align-items-center gap-3 position-absolute top-50`}>
      <BsArrowLeft size="1.5rem" style={{strokeWidth: '2px'}} color="green" className={styles.scrollIndincatorArrowLeft}/>
      <BsHandIndexThumb size="2rem" color={'green'}/>
      <BsArrowRight size="1.5rem" style={{strokeWidth: '2px'}} color="green" className={styles.scrollIndincatorArrowRight}/>
    </div>
  )
}

export default ScrollIndicator;