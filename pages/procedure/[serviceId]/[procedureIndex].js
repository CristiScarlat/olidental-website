import { useRouter } from 'next/router';
import { services } from '../../../utils/uiConstants';
import { TfiHandPointLeft } from 'react-icons/tfi';
import Link from 'next/link';
import CustomCarousel from '../../../components/carousel';

const Procedure = () => {
  const router = useRouter();
  const { serviceId, procedureIndex } = router.query;
  console.log({ serviceId: services[serviceId], procedureIndex });
  return (
    <div className="services-container m-auto">
      <div className="pt-4 pb-4 bg-gray">
        <div className="m-auto" style={{ maxWidth: '60rem' }}>
          <div className="d-flex align-items-center gap-2 justify-content-md-start justify-content-center px-2">
            <TfiHandPointLeft size="2rem" color="#6cab44"/>
            <Link href={`/service/${serviceId}`}>
              <span className="custom-link-services">{`Mergi înapoi la ${services[serviceId]?.title}`}</span>
            </Link>
          </div>
          <hr className="w-100"/>
          <div className="text-center">
            <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt="..." style={{ width: '75px' }} />
            <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
          </div>
        </div>
        <div className="pt-3 mb-2 d-flex flex-column m-auto" style={{maxWidth: '60rem'}}>
          <div className="m-2 d-flex flex-column gap-2">
            <CustomCarousel showThumbs={false} interval={3000}>
            {services[serviceId]?.procedures[procedureIndex]?.cazuri?.images.map((batch, index) => {
              return (
                <>
                  <div key={index + "-"} className={`d-flex gap-2 text-center ${batch.length <= 2 ? "justify-content-center" : ""}`}>
                    {batch.map((image, index, arr) => (
                      <div key={image + index} style={{position: 'relative'}}>
                        <img
                          src={`/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/thumbnail_${image}`}
                          className="procedure-cazuri-img mx-2"
                        />
                        {(index === 0 && arr.length > 1) && <div className="mx-2" style={{position: 'absolute', bottom: 0, color: 'white', left: 0, right: 0}}>înainte</div>}
                        {(index === 1 && arr.length > 1) && <div className="mx-2" style={{position: 'absolute', bottom: 0, color: 'white', left: 0, right: 0}}>{arr.length === 2 ? 'după' : 'în lucru'}</div>}
                        {(index === 2 && arr.length > 1) && <div className="mx-2" style={{position: 'absolute', bottom: 0, color: 'white', left: 0, right: 0}}>după</div>}
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
            </CustomCarousel>
          </div>
        </div>
        <div className="m-auto p-2" style={{ maxWidth: '60rem' }}>
          <div
            className="services-container-description"
            dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Procedure;
