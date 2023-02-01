import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { services } from "../../../utils/uiConstants";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const Procedure = () => {
    const router = useRouter();
    const { serviceId, procedureIndex } = router.query;

    return (
        <div className="services-container m-auto">
            <div className="pt-4 pb-4 bg-gray">
                <div className="m-auto" style={{ maxWidth: '60rem' }}>
                    <div className="text-center">
                        <img src={services[serviceId]?.procedures[procedureIndex]?.logo || ''} alt="..." style={{ width: "75px" }} />
                        <h3>{services[serviceId]?.procedures[procedureIndex]?.title || ''}</h3>
                    </div>
                </div>
                <div className="green-bg pt-3 mb-2 d-flex justify-content-center" style={{ overflowX: 'auto' }}>
                    {services[serviceId]?.procedures[procedureIndex]?.cazuri?.images.map((arr, index) => (
                        <div className="mb-3" key={"before-after" + index}>
                            <Carousel
                                className="carousel-custom-root"
                                stopOnHover={false}
                                showThumbs={false}
                                showArrows={false}
                                showIndicators={false}
                                dynamicHeight={true}
                                infiniteLoop
                                autoPlay={true}
                                showStatus={false}
                                interval={2000}
                                preventMovementUntilSwipeScrollTolerance={true}
                                swipeScrollTolerance={50}
                                animationHandler="fade"
                                swipeable={false}
                            >
                                {arr.map(image => <div>
                                    <img src={`/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/thumbnail_${image}`} style={{ width: 240 }} />
                                </div>)}
                            </Carousel>
                            {/* {arr.map(image => <div>
                            <img src={`/images/${services[serviceId]?.procedures[procedureIndex]?.cazuri?.dirPath}/${image}`} style={{ width: 240 }} />
                        </div>)} */}
                        </div>
                    ))}
                </div>
                <div className="m-auto ps-4 pe-4" style={{ maxWidth: '60rem' }}>
                    <div className="services-container-description" dangerouslySetInnerHTML={{ __html: services[serviceId]?.procedures[procedureIndex]?.description || '' }}></div>
                </div>
            </div>
            {/* <div className="d-flex" style={{ overflowX: 'auto' }}>
                {services[serviceId]?.procedures[procedureIndex]?.images?.map(image => <img key={image} src={`/images/services/${services[serviceId]?.procedures[procedureIndex]?.dirPath}/${image}`} style={{ width: 280 }} />)}
            </div> */}

        </div>
    )
}

export default Procedure;