import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import fetchMovies from "../../services/movieService";
import type { Movie } from "../../types/movie";

import style from "./App.module.css";


export default function App() { 
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const handleSearch = async (query: string) => {

        setMovies([]);
        setIsError(false);
        setIsLoading(true);

        try {
            const results = await fetchMovies({ query });

            if (results.length === 0) {
                toast("No movies found for your request.");
            } else {
                setMovies(results);
            }
        } catch {
            setIsError(true);
            toast.error("There was an error, please try again...");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSelectMovie = (movie: Movie) => {
        setSelectedMovie(movie);
    };
    
    const closeModal = () => {
        setSelectedMovie(null);
    };

    return (
        <div className={style.wrapper}>
            <SearchBar onSubmit={handleSearch} />
            {isLoading && <Loader />}
            {isError && <ErrorMessage />}
            {!isLoading && !isError && movies.length > 0 && (<MovieGrid movies={movies} onSelect={handleSelectMovie} />)}
            {selectedMovie && (<MovieModal movie={selectedMovie} onClose={closeModal} />
            )}
            <Toaster />
        </div>
    );
}
