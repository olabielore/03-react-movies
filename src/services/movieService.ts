import axios from "axios";
import type { Movie } from "../types/movie.ts";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const  BASE_URL = "https://api.themoviedb.org/3";

interface movieServiceProps {
  query: string;
  page?: number;
}

interface MoviesResponse {
  results: Movie[];
}

export default async function fetchMovies({ query, page} : movieServiceProps): Promise<Movie[]> {
  const config = {
    params: {
      query,
      page,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
  };

  const response = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    config
  );

  return response.data.results;
};
