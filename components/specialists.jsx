import styles from './styles/styles.module.css';
import { teamCards } from '../utils/uiConstants';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Specialists = () => {
  const router = useRouter();
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
          {teamCards.map((obj, index) => (
            <div key={obj.title + index} className="post item" style={{maxWidth: '20rem'}}>
              <div className="gallery-sec">
                <div className="image-hover img-layer-slide-left-right">
                {/* <Image src={obj.img} width={320} height={480} placeholder="blur" blurDataURL="/images/blur.jpg" objectFit/> */}
                <img src={obj.img} width={320} height={480} />
                  <div className="layer d-flex flex-column justify-content-center p-4">
                    {obj.specializations?.map(specializare => (
                      <p key={specializare} style={{color: '#fff'}} className="m-3">{specializare}</p>
                    ))}
                    <button className="read-more-button m-2 transparent read-more-button-fixed" onClick={() => router.push(`/team?id=${obj.title}`)}>Află mai mult</button>
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
