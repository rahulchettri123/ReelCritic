import axios from "axios";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

console.log("✅ API Key:", API_KEY);
console.log("✅ API Host:", API_HOST);

if (!API_KEY || !API_HOST) {
  console.error("❌ Missing API Key or Host. Check your .env file!");
}

export const fetchMostPopularMovies = async () => {
  try {
    console.log("🚀 Fetching movies...");

    const response = await axios.get(
      "https://imdb236.p.rapidapi.com/imdb/most-popular-movies",
      {
        headers: {
          "X-RapidAPI-Key": API_KEY,
          "X-RapidAPI-Host": API_HOST,
        },
      }
    );

    console.log("✅ Raw API Response:", response.data);

    // Ensure `response.data` contains movies in the expected format
    let movies = response.data.movies || response.data || [];

    // Validate that `movies` is actually an array
    if (!Array.isArray(movies) || movies.length === 0) {
      console.error("🚨 API Response does not contain a valid movie list:", response.data);
      throw new Error("No movies found in API response.");
    }

    console.log("✅ Processed Movies:", movies);
    return movies;
  } catch (error: any) {
    console.error("❌ Error fetching movies:", error?.response?.data || error.message);
    return [];
  }
};
