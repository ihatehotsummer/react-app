import { Link } from "react-router-dom";

function MovieDetail({coverImg, title,year,rating,runtime,genres,summary }) {
    return (
        <div>
            <h4><Link to={`/`}>Back to Home</Link></h4>
            <img src={coverImg} alt={title} />
            <h1>{title}</h1>
            <h4>year : {year}년     rating : {rating}점 </h4>
            <h4>runtime : {runtime}분</h4>
            <h4>{genres.map((g) => (<li key={g}>{g}</li>))}</h4>
            <p>{summary}</p>
        </div>
        
    )
}

export default MovieDetail;