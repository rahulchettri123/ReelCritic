// src/components/posts/CreatePost.tsx

import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Star } from 'lucide-react';

interface CreatePostProps {
  onSubmit: (post: any) => void;
}

export const CreatePost: React.FC<CreatePostProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [movieTitle, setMovieTitle] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock user data - in a real app, this would come from authentication
    const mockUser = {
      userId: 'user1',
      userName: 'John Doe',
      userAvatar: '/api/placeholder/40/40'
    };

    onSubmit({
      ...mockUser,
      movieTitle,
      movieImage: 'https://via.placeholder.com/300', // This would be selected from movie search
      content,
      rating,
      genres: ['Action'] // This would be from selected movie
    });

    // Reset form
    setContent('');
    setMovieTitle('');
    setRating(0);
  };

  return (
    <Card className="bg-dark text-light mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-center mb-3">
            <Col xs="auto">
              <img
                src="/api/placeholder/40/40"
                alt="User"
                className="rounded-circle"
                width="40"
                height="40"
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search for a movie..."
                value={movieTitle}
                onChange={(e) => setMovieTitle(e.target.value)}
                className="bg-dark text-light border-secondary"
              />
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share your thoughts about this movie..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-dark text-light border-secondary"
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  fill={star <= rating ? "gold" : "none"}
                  color={star <= rating ? "gold" : "gray"}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Button 
              type="submit" 
              variant="danger"
              disabled={!content.trim() || !movieTitle.trim() || !rating}
            >
              Post
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};