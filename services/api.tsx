import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

// In services/api.ts

// In services/api.ts

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await axios.get(
      "https://imdb236.p.rapidapi.com/imdb/most-popular-movies",  // Using the same endpoint that works
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }
    );

    // Find the specific movie from the response array
    const movieData = response.data.find((movie: any) => movie.id === movieId);

    if (!movieData) {
      throw new Error("Movie not found in the response");
    }

    console.log('Found movie data:', movieData); // For debugging
    return movieData;
  } catch (error: any) {
    console.error("❌ Error fetching movie details:", error?.response?.data || error.message);
    throw error;
  }
};
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











/**
 * Fetches autocomplete search suggestions from IMDB API.
 * This function is triggered as the user types in the search bar.
 */
export const fetchAutocompleteMovies = async (query: string) => {
  if (!query) return []; // ✅ Prevent API call if query is empty

  try {
    console.log(`🔍 Fetching autocomplete results for: ${query}`);

    const response = await axios.get(`https://imdb236.p.rapidapi.com/imdb/autocomplete`, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
      params: { query },
    });

    console.log("🔍 Full API Response:", response.data); // ✅ Debug full API response

    // ✅ Extract all available fields from response
    if (response.data && response.data.length > 0) {
      const processedResults = response.data.map((movie: any) => ({
        id: movie.id || "N/A",
        title: movie.primaryTitle || movie.originalTitle || "Unknown Title",
        poster: movie.primaryImage || "/no-image.png",
        type: movie.type || "Unknown Type",
        averageRating: movie.averageRating || null,
        contentRating: movie.contentRating || null,
        description: movie.description || null,
        genres: movie.genres || [],
        releaseDate: movie.releaseDate || null,
        startYear: movie.startYear || null,
        runtimeMinutes: movie.runtimeMinutes || null,
        languages: movie.languages || [],
        countriesOfOrigin: movie.countriesOfOrigin || []
      }));

      console.log("✅ Processed Results:", processedResults); // ✅ Debug processed data
      return processedResults;
    }

  
    return [];
  } catch (error: any) {
    console.error("❌ Error fetching autocomplete search results:", error?.response?.data || error.message);
    return [];
  }
};


