import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
// import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";

import style from "./App.module.css";


export default function App() { 
    const [movies, setMovies] = useState<Movie[]>([]);
    // const [isLoader, setIsLoader] = useState(false);
    // const [isError, setIsError] = useState(false);


    const handleSearch = async (query: string) => {

        setMovies([]);

        try {
            const results = await fetchMovies({ query });
            if (results.length === 0) {
                toast("No movies found for your request.");
            } else {
                setMovies(results);
            }
        } catch {
            toast.error("There was an error, please try again...");
        }
    };
    

    return (
        <div className={style.wrapper}>
            <SearchBar onSubmit={handleSearch} />
            {/* {movie && <MovieGrid/>} */}
            <ul>
               {movies.map(movie => (
                 <li key={movie.id}>{movie.title}</li>
               ))}
            </ul>

        <Toaster />
        </div>
    )
}
