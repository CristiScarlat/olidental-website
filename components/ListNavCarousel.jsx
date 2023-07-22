import {Children, useState} from 'react';
import styles from './styles/styles.module.css';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

const ListNavCarousel = ({children}) => {
  const childrenCount = Children.count(children);




  const renderChildren = () => {
    const arr = []
    Children.forEach(children,(element, index) => {
      const images = element.props.children[0].props.images
      console.log("props", element.props.children[0].props)
      arr.push(
        <div key={index} style={{cursor: 'pointer', opacity: index === imgNo ? 1 : 0.4}} className="d-flex justify-content-center border border-white p-1" onClick={() => setImgNo(index)}>
          {images.map((image) => (
            <img key={image} src={image} alt="..." style={{width: 60}}/>)
          )}
        </div>
      )
    })
    return arr;
  }
  children && console.log(children)
  return (
    <div className={styles.listNavCarouselWrapper}>

      {childrenCount ? children && children[imgNo] : <div className="text-center mb-5">Nu există imagini pentru această categorie.</div>}

    </div>
  );
}

export default ListNavCarousel;