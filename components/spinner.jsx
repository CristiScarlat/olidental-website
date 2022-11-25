import { Spinner as BsSpinner } from "react-bootstrap";
import styles from "./styles/styles.module.css";

const Spinner = ({ global, animation="border", variant="primary" }) => {
    return (
        global ? <div className={styles.spinnerGlobalWrapper}>
            <BsSpinner animation={animation} role="status" variant={variant}>
          <span className="visually-hidden">Loading...</span>
        </BsSpinner>
        </div> :
        <BsSpinner animation={animation} role="status" variant={variant}>
        <span className="visually-hidden">Loading...</span>
      </BsSpinner>
      );
}

export default Spinner;