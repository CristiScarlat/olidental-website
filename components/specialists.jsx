import styles from './styles/styles.module.css';
import { teamCards } from '../utils/uiConstants';

const Specialists = () => {

  return (
    <div className="meet-specialists" style={{backgroundColor: "#d4d4d4"}}>
      <div className="text-center">

          <div className="main-title">
            <h2>
              <span>Echipa noastră de</span> Specialiști
            </h2>
          </div>

      </div>

      <div>
        <div className={styles.specialistsCardsRow}>
          {teamCards.ro.map((obj, index) => (
            <div key={obj.title + index} className="post item" style={{maxWidth: '20rem'}}>
              <div className="gallery-sec">
                <div className="image-hover img-layer-slide-left-right">
                  <img src={obj.img} alt="" style={{objectFit: 'cover'}}/>
                  <div className="layer">
                    {obj.body.split(',').map(specializare => (
                      <p key={specializare} style={{color: '#fff'}}>{specializare}</p>
                    ))}
                    <button className="read-more-button m-2 transparent">Află mai mult</button>
                  </div>
                </div>
              </div>

              <div className="detail text-center">
                <h6>{obj.title}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specialists;
