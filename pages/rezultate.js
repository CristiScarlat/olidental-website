import ImageComparator from "../components/imageComparator";

const Results = () => {
    return (
        <div className="row mb-3 m-auto">
            <div className="col-md-6">

            </div>
            <div className="col-md-6">
                <ImageComparator images={['images/beforeAfter/BA13.png', 'images/beforeAfter/BA14.png']} />
            </div>
        </div>
    )
}

export default Results;