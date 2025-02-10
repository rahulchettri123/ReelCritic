import { useEffect, useState } from "react";
import { fetchMostPopularMovies } from "../../../services/api";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

interface Movie {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  averageRating: number | string;
  releaseDate: string;
  url: string;
}

export default function TopMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [groupedMovies, setGroupedMovies] = useState<Movie[][]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMostPopularMovies();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("No movies found in API response.");
        }

        const formattedMovies = data.map((movie: any) => ({
          id: movie.id,
          primaryTitle: movie.primaryTitle || "Unknown Title",
          primaryImage: movie.primaryImage || "https://via.placeholder.com/300",
          averageRating: movie.averageRating || "N/A",
          releaseDate: movie.releaseDate || "Unknown",
          url: movie.url || "#",
        }));

        setMovies(formattedMovies);
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  // Group movies into chunks of 6 for carousel items
  useEffect(() => {
    if (movies.length) {
      const chunkSize = 6;
      const grouped = [];
      for (let i = 0; i < movies.length; i += chunkSize) {
        grouped.push(movies.slice(i, i + chunkSize));
      }
      setGroupedMovies(grouped);
    }
  }, [movies]);

  return (
    <div className="movies-section">
      <h2 className="text-light mb-4 text-center">🔥 Most Popular Movies</h2>

      <Container fluid>
        {groupedMovies.length > 0 ? (
          <Carousel controls={true} indicators={false} interval={5000} className="movie-carousel">
            {groupedMovies.map((group, index) => (
              <Carousel.Item key={index}>
                <Row className="justify-content-center">
                  {group.map((movie) => (
                    <Col key={movie.id} xs={12} sm={6} md={4} lg={2} className="movie-item">
                      <img src={movie.primaryImage} alt={movie.primaryTitle} className="movie-image" />
                      <div className="movie-info">
                        <h5>{movie.primaryTitle}</h5>
                        <p>⭐ {movie.averageRating} | 📅 {movie.releaseDate}</p>
                        <a href={movie.url} target="_blank" rel="noopener noreferrer" className="imdb-link">
                          IMDB: View
                        </a>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <div className="text-center">
            <div className="spinner-border text-danger"></div>
          </div>
        )}
      </Container>
    </div>
  );
}
