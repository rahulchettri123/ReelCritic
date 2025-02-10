import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { searchMovies } from "../../../services/api";
import "./index.css";

// ✅ Define Correct Movie Type
interface Movie {
  id: string;
  title: string;
  poster: string | null; // ✅ Allow `null` for missing images
  rating: string;
}

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    console.log(`🔄 Fetching new results for: ${query}`);

    const fetchMovies = async () => {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
    };

    fetchMovies();
  }, [query]); // ✅ Ensures search updates when query changes

  return (
    <Container className="search-results-container">
      <h2 className="text-white text-center my-4">Search Results for "{query}"</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="light" />
        </div>
      ) : movies.length === 0 ? (
        <p className="text-center text-light">No results found.</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="bg-dark text-light">
                <div className="image-container">
                  {/* ✅ Check if movie.poster exists */}
                  {movie.poster ? (
                    <Card.Img
                      variant="top"
                      src={movie.poster}
                      alt={movie.title}
                      className="fixed-height-image"
                      onError={(e) => (e.currentTarget.src = "/no-image.png")} // ✅ Fallback if image fails to load
                    />
                  ) : (
                    <div className="no-image-container">
                      <p>Currently Not Available</p>
                    </div>
                  )}
                </div>
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>⭐ {movie.rating}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
