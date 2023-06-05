import {Children, useState} from 'react';
import styles from './styles/styles.module.css';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

const ListNavCarousel = ({children}) => {
  const childrenCount = Children.count(children);
  const [index, setIndex] = useState(0);
  const handleNavPrev = () => {
    setIndex(state => {
      if(state === 0)return childrenCount-1;
      return state - 1;
    })
  }
  const handleNavNext = () => {
    setIndex(state => {
      if(state === childrenCount-1)return 0;
      return state + 1;
    })
  }

  return (
    <div className={styles.listNavCarouselWrapper}>
      {childrenCount ? children && children[index] : <div className="text-center mb-5">Nu există imagini pentru această categorie.</div>}
      <div className={styles.listNavCarouselControlsContainer}>
        <button onClick={handleNavPrev}><BiCaretLeft/></button>
        <span>{`${index+1}/${childrenCount}`}</span>
        <button onClick={handleNavNext}><BiCaretRight/></button>
      </div>
    </div>
  );
}

export default ListNavCarousel;