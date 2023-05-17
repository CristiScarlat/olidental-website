import { useState } from 'react';
import ImageComparator from '../components/imageComparator';
import { Dropdown } from 'react-bootstrap';
import { beforeAfter, procedures } from '../utils/uiConstants';
import styles from '../styles/rezultate.module.css';

const Results = () => {
  const [selectedProcedure, setSelectedProcedure] = useState();
  const handleSelectProcedure = (procedureIndex) => {
    setSelectedProcedure(procedures[procedureIndex]);
  };
  return (
    <>
      <hr className="m-0 mb-3" />
      <div style={{ maxWidth: '70rem', margin: 'auto' }}>
        {beforeAfter
          .filter((obj) => (selectedProcedure ? obj.category === procedures.indexOf(selectedProcedure) : true))
          .map((obj, index) => (
            <div className="row custom-gray-row mb-3 m-auto" style={{ minHeight: 300 }} key={'before-after' + index}>
              <div className="col-md-6 pt-3">
                <h3 style={{ fontWeight: 800 }}>{obj.title}</h3>
                <p className={styles.rezultateCategorie}>
                  <span className="me-1">Procedura:</span>
                  {procedures[obj.category]}
                </p>
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
                <div className="m-auto w-100 unselectable">
                  {obj.images?.map(imgs => (
                    Array.isArray(imgs) && <ImageComparator key={imgs[0]} images={imgs.map((imgName) => `images/beforeAfter/${imgName}`)} maxWidth={400} />
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Results;
