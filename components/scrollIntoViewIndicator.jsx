
import styles from "./styles/styles.module.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

const ScrollIntoViewIndicator = ({onClickLeft=()=>{}, onClickRight=()=>{}}) => {

  const iconStyle = {
    borderRadius: '50%',
    fill: "green",
    background: "#001200"
  }

  const wrapperStyle = {
    position: "absolute",
    top: "44%",
    left: "18px",
    right: "18px"
  }

  return(
    <div className="d-flex gap-2 justify-content-between mt-2" style={wrapperStyle}>
      <BsFillArrowLeftCircleFill size="2rem" style={iconStyle} onClick={onClickLeft}/>
      <BsFillArrowRightCircleFill size="2rem" style={iconStyle} onClick={onClickRight}/>
    </div>
  )
}

export default ScrollIntoViewIndicator;