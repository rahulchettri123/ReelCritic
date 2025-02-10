import { useState, useEffect } from "react";

import { Container, Card } from "react-bootstrap";
import "./index.css";

// ✅ Define Review Type
interface Review {
  id: number;
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [latestReviews, setLatestReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Simulate fetching user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // ✅ Provide Properly Typed Data
    setLatestReviews([
      { id: 1, title: "Inception Review", content: "A mind-blowing experience!", author: "JohnDoe" },
      { id: 2, title: "Avatar Review", content: "Visually stunning!", author: "JaneDoe" },
    ]);
  }, []);

  return (
    <Container className="home-container text-center">
      <h1 className="text-white my-4">Welcome to <span className="text-danger">ReelCritic</span></h1>
      <p className="text-light">Discover and share your thoughts on the latest movies and TV shows.</p>

      {/* Anonymous Users View */}
      {!user ? (
        <div>
          <p className="text-light">Join our community today!</p>

        </div>
      ) : (
        /* Logged-In User View */
        <div>
          <h2 className="text-white">Welcome back, {user.name}!</h2>
          <p className="text-light">Here are your latest reviews:</p>
          {latestReviews.map(review => (
            <Card key={review.id} className="m-3 text-start">
              <Card.Body>
                <Card.Title>{review.title}</Card.Title>
                <Card.Text>{review.content}</Card.Text>
                <Card.Footer className="text-muted">by {review.author}</Card.Footer>
              </Card.Body>
            </Card>
          ))}
          
        </div>
      )}
    </Container>
  );
}
