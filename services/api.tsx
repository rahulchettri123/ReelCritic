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





export const searchMovies = async (query: string) => {
  try {
    console.log(`🔍 Fetching results for: ${query}`);

    const response = await axios.get(`https://imdb236.p.rapidapi.com/imdb/search`, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": API_HOST,
      },
      params: { query },
    });

    console.log("🔍 API Response:", response.data);

    if (response.data.results) {
      // ✅ Manually filter results based on `primaryTitle`
      const filteredMovies = response.data.results.filter((movie: any) =>
        movie.primaryTitle.toLowerCase().includes(query.toLowerCase())
      );

      return filteredMovies.map((movie: any) => ({
        id: movie.id || "N/A",
        title: movie.primaryTitle || "Unknown Title",
        poster: movie.primaryImage || null,
        rating: movie.rating || "N/A",
      }));
    }

    throw new Error("No movies found in API response.");
  } catch (error: any) {
    console.error("❌ Error fetching search results:", error?.response?.data || error.message);
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

    // ✅ Extract results from response
    if (response.data && response.data.length > 0) {
      const processedResults = response.data.map((movie: any) => ({
        id: movie.id || "N/A",
        title: movie.primaryTitle || movie.originalTitle || "Unknown Title",
        poster: movie.primaryImage || "/no-image.png", // ✅ Ensure correct field
        type: movie.type || "Unknown Type",
      }));

      console.log("✅ Processed Results:", processedResults); // ✅ Debug processed data
      return processedResults;
    }

    console.error("❌ No valid results found in API response.");
    return [];
  } catch (error: any) {
    console.error("❌ Error fetching autocomplete search results:", error?.response?.data || error.message);
    return [];
  }
};


