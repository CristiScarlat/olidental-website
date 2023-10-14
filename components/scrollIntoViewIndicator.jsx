
import styles from "./styles/styles.module.css";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";

const ScrollIntoViewIndicator = ({onClickLeft=()=>{}, onClickRight=()=>{}}) => {

  const iconStyle = {
    borderRadius: '50%',
    fill: "#bfbcbc",
    background: "#0012006e"
  }

  const wrapperStyle = {
    position: "absolute",
    top: "44%",
    left: "18px",
    right: "18px"
  }

  return(
    <div className="d-flex gap-2 justify-content-between mt-2" style={wrapperStyle}>
      <BiCaretLeft size="2rem" style={iconStyle} onClick={onClickLeft}/>
      <BiCaretRight size="2rem" style={iconStyle} onClick={onClickRight}/>
    </div>
  )
}

export default ScrollIntoViewIndicator;