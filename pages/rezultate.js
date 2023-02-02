import ImageComparator from "../components/imageComparator";
import { beforeAfter } from "../utils/uiConstants";

const Results = () => {
    return (
        <>
        <hr className="m-0 mb-3"/>
        <div style={{maxWidth: '70rem', margin: 'auto'}}>
            {beforeAfter.map((obj, index) => (
                <div className="row custom-gray-row mb-3 m-auto align-items-center" style={{minHeight: 300}} key={"before-after" + index}>
                    <div className="col-md-6">
                        <h3>{obj.title}</h3>
                        <p>{obj.description}</p>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-2 mt-2 m-auto" style={{maxWidth: 400}}>
                            <span>Dificutate</span>
                            <div className="level-gradient-bar" style={{background: `linear-gradient(90deg, #6cab44 ${obj.difficultyLevel*10 - 10}%, #778187 ${obj.difficultyLevel*10}%)`}}></div>
                        </div>
                        <div className="m-auto w-100 unselectable">
                            <ImageComparator images={obj.images.map(imgName => `images/beforeAfter/${imgName}`)} maxWidth={400}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Results;