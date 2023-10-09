
import { FaCaretUp } from "react-icons/fa";
import { useEffect, useState } from 'react';

const ScrollToTop = () => {

  const [display, setDisplay] = useState('none');

  useEffect(() => {
    window.onscroll = (e) => {
      if(window.scrollY > 700){
        setDisplay('block');
      }
      else {
        setDisplay('none');
      }
    }
  }, [])

  return (

    <div style={{position: "fixed", bottom: "4rem", right: "1rem", display}}>
    <button style={{
      border: 'none',
      background: 'transparent'
    }}
    onClick={() => {
      window.scrollTo(0, 0)
    }}>
      <FaCaretUp size="3rem" color={"green"}/>
      <p style={{fontSize: "10px"}}>Scroll to Top</p>
    </button>
  </div>)
}

export default ScrollToTop;