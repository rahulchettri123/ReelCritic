// src/components/home/index.tsx

import  { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Card, Button } from 'react-bootstrap';
import { getPosts, addPost, Post } from '../../../services/posts';
import { PostCard } from '../../components/posts/PostCard';
import { CreatePost } from '../../components/posts/CreatePost';

const GENRES = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const recentPosts = await getPosts();
        setPosts(recentPosts);
        setFilteredPosts(recentPosts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedGenre === 'All') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => 
        post.genres.includes(selectedGenre)
      );
      setFilteredPosts(filtered);
    }
  }, [selectedGenre, posts]);

  const handleCreatePost = async (postData: any) => {
    try {
      const newPost = await addPost(postData);
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (err: any) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <Container fluid className="py-5 mt-5">
      <Row>
        {/* Main Content */}
        <Col md={8}>
          <CreatePost onSubmit={handleCreatePost} />
          
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="text-light mb-0">Posts</h5>
            <div className="d-flex gap-2">
              {GENRES.map(genre => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? "danger" : "outline-light"}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : error ? (
            <div className="text-danger text-center py-5">
              Error: {error}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-light text-center py-5">
              No posts found for this genre. Be the first to post!
            </div>
          ) : (
            <div>
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </Col>

        {/* Sidebar */}
        <Col md={4}>
          <Card className="bg-dark text-light">
            <Card.Header>
              <h5 className="mb-0">Recent Activity</h5>
            </Card.Header>
            <Card.Body>
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="mb-3 border-bottom border-secondary pb-2">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={post.userAvatar}
                      alt={post.userName}
                      className="rounded-circle"
                      width="30"
                      height="30"
                    />
                    <div>
                      <small className="fw-bold">{post.userName}</small>
                      <small className="text-muted d-block">
                        posted about {post.movieTitle}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}