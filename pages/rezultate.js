import { useState, useRef, useEffect } from 'react';
import ImageComparator from '../components/imageComparator';
import { beforeAfter, procedures } from '../utils/uiConstants';
import styles from '../styles/rezultate.module.css';
import { Pagination, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import ButtonsGroupPagination from '../components/buttonsGroupPagination';
import ScrollToTop from '../components/scrollToTop';

const Results = () => {
  const [selectedProcedure, setSelectedProcedure] = useState(0);
  const cards = useRef([]);

  const handleScrollToCard = (index) => {
    setSelectedProcedure(index);
    cards.current[index].scrollIntoView({block: "center"});
  }

  return (
    <>
      <hr className="m-0" />
      <ButtonsGroupPagination
        className={styles.resultsNavigationHeader}
        noOfButtons={beforeAfter.length-1}
      buttonClassName={styles.resultsNavigationButton}
        buttonOnClick={handleScrollToCard}/>
      <div style={{ maxWidth: '70rem', margin: 'auto' }}>
        {beforeAfter
          .map((obj, index) => (
            <div ref={ref => {if(!cards.current.includes(ref))cards.current.push(ref)}} className="row bg-gray p-3 mb-5 m-auto" style={{ minHeight: 300 }} key={'before-after' + index}>
              <div className={`col-md-6 p-3`}>
                <h3 style={{ fontWeight: 800 }}>{`${index+1}. ${obj.title}`}</h3>
                {/*<p className={styles.rezultateCategorie}>*/}
                {/*  <span className="me-1">Procedura:</span>*/}
                {/*  {procedures[obj.category]}*/}
                {/*</p>*/}
                <p>{obj.description}</p>
              </div>
              <div className="col-md-6">
                <div className="mb-2 mt-2 m-auto" style={{ maxWidth: 400 }}>
                  <span>Dificutate</span>
                  <div
                    className="level-gradient-bar"
                    style={{ background: `linear-gradient(90deg, #6cab44 ${obj.difficultyLevel * 10 - 10}%, #778187 ${obj.difficultyLevel * 10}%)` }}
                  ></div>
                </div>
                <div className="m-auto w-100 unselectable children-no-border">
                  {obj.images?.map(imgs => (
                    Array.isArray(imgs) && <ImageComparator key={imgs[0]} images={imgs.map((imgName) => `images/beforeAfter/thumbnail_${imgName}`)} maxWidth={400}/>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <ScrollToTop />
    </>
  );
};

export default Results;
