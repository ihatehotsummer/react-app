import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieDetail from "../components/MovieDetail";

function Detail() {
    const { id } = useParams(); // useParams를 쓰면 Route에 경로로 저장했던 (/movie/:id) id 값으로 저장된 값을 가져올 수 있다
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getMovie = async () => {
        const json = await(await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)).json();
        setMovie(json.data.movie);
        console.log(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, []);
    
    return (
        <div>
            {loading ? <h1>Loading...</h1> :( 
                <div>
                    {<MovieDetail
                            key={movie.id}
                            id={movie.id}
                            coverImg={movie.large_cover_image}
                            title={movie.title}
                            summary={movie.description_full}
                            genres={movie.genres}
                            rating={movie.rating}
                            year={movie.year}
                            runtime={movie.runtime}
                        />
                    }
                </div>)}
        </div>
    )
    
    
}
export default Detail;