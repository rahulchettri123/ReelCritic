import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

export default function Login() {
  return (
    <div className="login-page">
      <Container className="login-container">
        <h2 className="text-white text-center mb-4">Sign In</h2>
        
        <Form>
          {/* Email Input */}
          <Form.Group controlId="email">
            <Form.Control type="email" placeholder="Email or phone number" className="login-input" />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="password" className="mt-3">
            <Form.Control type="password" placeholder="Password" className="login-input" />
          </Form.Group>

          {/* Login Button */}
          <Button variant="danger" type="submit" className="w-100 mt-4 login-btn">Sign In</Button>

          {/* Remember Me & Forgot Password */}
          <Row className="mt-3 text-light">
            <Col>
              <Form.Check type="checkbox" label="Remember me" className="text-light" />
            </Col>
            <Col className="text-end">
              <Link to="/forgot-password" className="text-muted login-link">Forgot password?</Link>
            </Col>
          </Row>

          {/* Sign Up */}
          <p className="mt-4 text-light text-center">
            New to <span className="text-danger">ReelCritic</span>?  
            <Link to="/register" className="text-danger ms-1 login-link">Sign up now</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}
