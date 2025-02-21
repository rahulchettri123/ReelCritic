import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../../../services/api";
import { Container, Row, Col, Button, Spinner, Form } from "react-bootstrap";
import "./index.css"
interface MovieDetails {
  id: string;
  primaryTitle: string;
  primaryImage: string;
  averageRating: number;
  releaseDate: string;
  description: string;
  contentRating: string;
  genres: string[];
  runtimeMinutes: number;
  budget: number;
  countriesOfOrigin: string[];
  filmingLocations: string[];
  interests: string[];
  numVotes: number;
  type: string;
  url: string;
  isAdult: boolean;
}

interface Comment {
  id: string;
  text: string;
  username: string;
  timestamp: string;
  likes: string[]; // Array of usernames who liked
}

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New states for comments
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getMovieDetails = async () => {
      if (!movieId) return;
      
      try {
        setLoading(true);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
        
        // Load comments from localStorage
        const savedComments = localStorage.getItem(`comments_${movieId}`);
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !newComment.trim()) {
      alert("Please enter both username and comment");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      username: username,
      timestamp: new Date().toLocaleString(),
      likes: []
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleLikeComment = (commentId: string, username: string) => {
    if (!username.trim()) {
      alert("Please enter a username to like comments");
      return;
    }

    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        if (comment.likes.includes(username)) {
          // Unlike if already liked
          return {
            ...comment,
            likes: comment.likes.filter(like => like !== username)
          };
        } else {
          // Add like
          return {
            ...comment,
            likes: [...comment.likes, username]
          };
        }
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(`comments_${movieId}`, JSON.stringify(updatedComments));
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="danger" />
      </Container>
    );
  }

  if (error || !movie) {
    return (
      <Container className="text-center mt-5">
        <h3 className="text-danger">Error: {error || "Movie not found"}</h3>
        <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container className="movie-details-container py-5">
      <Button variant="outline-light" className="mb-4" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      
      <Row>
        <Col md={4}>
          <img 
            src={movie.primaryImage || "https://via.placeholder.com/300"} 
            alt={movie.primaryTitle}
            className="movie-poster img-fluid rounded shadow"
          />
        </Col>
        <Col md={8}>
          <h1 className="text-light mb-3">{movie.primaryTitle}</h1>
          
          <div className="movie-meta mb-4">
            {movie.averageRating && (
              <span className="badge bg-warning me-2">
                ⭐ {movie.averageRating.toFixed(1)} ({movie.numVotes?.toLocaleString() || 0} votes)
              </span>
            )}
            {movie.contentRating && (
              <span className="badge bg-info me-2">{movie.contentRating}</span>
            )}
            {movie.runtimeMinutes && (
              <span className="badge bg-secondary me-2">{movie.runtimeMinutes} min</span>
            )}
            {movie.releaseDate && (
              <span className="badge bg-primary">{movie.releaseDate}</span>
            )}
          </div>

          {movie.description && (
            <p className="text-light mb-4">{movie.description}</p>
          )}

          <div className="movie-details text-light">
            {movie.genres && movie.genres.length > 0 && (
              <p><strong>Genres:</strong> {movie.genres.join(", ")}</p>
            )}
            {movie.interests && movie.interests.length > 0 && (
              <p><strong>Tags:</strong> {movie.interests.join(", ")}</p>
            )}
            {movie.filmingLocations && movie.filmingLocations.length > 0 && (
              <p><strong>Filming Locations:</strong> {movie.filmingLocations.join(", ")}</p>
            )}
            {movie.countriesOfOrigin && movie.countriesOfOrigin.length > 0 && (
              <p><strong>Countries of Origin:</strong> {movie.countriesOfOrigin.join(", ")}</p>
            )}
            {movie.budget && (
              <p><strong>Budget:</strong> ${(movie.budget / 1000000).toFixed(1)}M</p>
            )}
          </div>
        </Col>
      </Row>

      {/* Comments Section */}
      <section className="mt-5 text-light">
        <h3 className="mb-4">Comments</h3>
        
        {/* Comment Form */}
        <Form onSubmit={handleSubmitComment} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-dark text-light"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              className="bg-dark text-light"
            />
          </Form.Group>
          <Button type="submit" variant="outline-light">Post Comment</Button>
        </Form>

        {/* Comments List */}
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="p-3 mb-3 border border-secondary rounded bg-dark">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 text-light">@{comment.username}</h6>
                <small className="text-light">{comment.timestamp}</small>
              </div>
              <p className="mb-2 text-light">{comment.text}</p>
              <div className="d-flex align-items-center">
                <Button 
                  variant="outline-light" 
                  size="sm"
                  onClick={() => handleLikeComment(comment.id, username)}
                  className="me-2"
                >
                  {comment.likes.includes(username) ? "❤️ Unlike" : "🤍 Like"}
                </Button>
                <small className="text-light">
                  {comment.likes.length} {comment.likes.length === 1 ? 'like' : 'likes'}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}