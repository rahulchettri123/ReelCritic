// src/components/posts/PostCard.tsx

import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageSquare, Star, Share2 } from 'lucide-react';
import { Post } from '../../../services/posts';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <Card className="mb-4 bg-dark text-light">
      <Card.Body>
        <Row className="align-items-start">
          <Col xs="auto">
            <img
              src={post.userAvatar}
              alt={post.userName}
              className="rounded-circle"
              width="40"
              height="40"
            />
          </Col>
          <Col>
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h6 className="mb-0">{post.userName}</h6>
                <small className="text-muted">
                  posted about {post.movieTitle} • {formatTimestamp(post.timestamp)}
                </small>
              </div>
              <Badge bg="primary" className="d-flex align-items-center gap-1">
                <Star size={14} /> {post.rating}/5
              </Badge>
            </div>
          </Col>
        </Row>

        <p className="mt-3">{post.content}</p>

        {/* Movie Preview */}
        <div 
          className="position-relative movie-preview"
          onClick={() => navigate(`/reel-critic/movies/${post.movieId}`)}
          style={{ cursor: 'pointer' }}
        >
          <Row>
            <Col xs={4} md={3}>
              <img
                src={post.movieImage}
                alt={post.movieTitle}
                className="img-fluid rounded"
              />
            </Col>
            <Col xs={8} md={9}>
              <h5>{post.movieTitle}</h5>
              <div className="d-flex flex-wrap gap-2">
                {post.genres.map(genre => (
                  <Badge key={genre} bg="secondary">{genre}</Badge>
                ))}
              </div>
            </Col>
          </Row>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 d-flex gap-4">
          <button className="btn btn-link text-light p-0 d-flex align-items-center gap-2">
            <Heart size={18} /> {post.likes}
          </button>
          <button className="btn btn-link text-light p-0 d-flex align-items-center gap-2">
            <MessageSquare size={18} /> Comment
          </button>
          <button className="btn btn-link text-light p-0 d-flex align-items-center gap-2">
            <Share2 size={18} /> Share
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};