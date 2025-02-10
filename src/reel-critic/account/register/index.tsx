import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

export default function Register() {
  return (
    <div className="register-page">
      <Container className="register-container">
        <h2 className="text-white text-center mb-4">Sign Up</h2>
        
        <Form>
          {/* Name Input */}
          <Form.Group controlId="name">
            <Form.Control type="text" placeholder="Full Name" className="register-input" />
          </Form.Group>

          {/* Email Input */}
          <Form.Group controlId="email" className="mt-3">
            <Form.Control type="email" placeholder="Email address" className="register-input" />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="password" className="mt-3">
            <Form.Control type="password" placeholder="Password" className="register-input" />
          </Form.Group>

          {/* Confirm Password Input */}
          <Form.Group controlId="confirm-password" className="mt-3">
            <Form.Control type="password" placeholder="Confirm Password" className="register-input" />
          </Form.Group>

          {/* Terms & Conditions */}
          <Form.Group className="mt-3">
            <Form.Check 
              type="checkbox" 
              label="I agree to the Terms & Conditions" 
              className="text-light"
            />
          </Form.Group>

          {/* Register Button */}
          <Button variant="danger" type="submit" className="w-100 mt-4 register-btn">Sign Up</Button>

          {/* Already have an account? */}
          <p className="mt-4 text-light text-center">
            Already a member? 
            <Link to="/login" className="text-danger ms-1 register-link">Sign in now</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}
