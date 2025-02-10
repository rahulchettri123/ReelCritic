import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export const fetchMostPopularMovies = async () => {
  try {
    const response = await axios.get(
      "https://imdb236.p.rapidapi.com/imdb/most-popular-movies",
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }
    );

    // Extract movie data
    const movies = response.data.movies || response || [];

    // Validate the movie data format
    if (!Array.isArray(movies) || movies.length === 0) {
      throw new Error("No movies found in API response.");
    }

    return movies;
  } catch (error: any) {
    console.error("❌ Error fetching movies:", error?.response?.data || error.message);
    return [];
  }
};
