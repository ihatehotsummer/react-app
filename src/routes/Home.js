import Movie from "../components/Movie";
import { useState, useEffect } from "react";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    // 원래 사용하던 방식의 then을 쓰지않고 async await를 사용한 방법 1
    // const getMovies = async () => {
    //   const response = await fetch('https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year');
    //   const json = await response.json();
    //   setMovies(json.data.movies);
    //   setLoading(false);
    // };

    // 방법 1의 축약판
    const getMovies = async () => {
        const json = await (await fetch( 'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year')).json(); 
        setMovies(json.data.movies);
        console.log(json.data.movies);
        setLoading(false);
    }
    
    // useEffect(() => {
    //   fetch(
    //     'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
    //   ).then((response) => response.json())
    //     .then(json => {
    //       setMovies(json.data.movies)
    //       setLoading(false)
    //     });
    // }, []);
    useEffect(() => {
        getMovies();
    }, [])

        return (
        <div className="movies-grid">
            {loading ? <h1>Loading...</h1> : (
            <div>{movies.map((movie) => (
                <Movie
                    key={movie.id}
                    id={movie.id}
                    coverImg={movie.medium_cover_image}
                    title={movie.title}
                    summary={movie.summary}
                    genres={movie.genres}
                />
                ))}
            </div>)}
        </div>
    );
}

export default Home;