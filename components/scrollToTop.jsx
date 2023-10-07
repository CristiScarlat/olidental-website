
import { BiUpArrow } from "react-icons/bi";
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
      borderRadius: '5px',
      backgroundColor: '#6cab44b5'
    }}
    onClick={() => {
      window.scrollTo(0, 0)
    }}><BiUpArrow size="2rem"/></button>
  </div>)
}

export default ScrollToTop;