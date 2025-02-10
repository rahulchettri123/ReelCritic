import { Navbar, Nav, Button, Container, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export default function Navigation() {
  return (
    <Navbar bg="black" expand="lg" fixed="top" className="px-4">
      <Container fluid>
        {/* Left-Aligned Brand Name */}
        <Navbar.Brand as={Link} to="/reel-critic" className="fw-bold text-uppercase text-light fs-1">
          <span style={{ color: "white" }}>Reel</span>
          <span style={{ color: "red" }}>Critic</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          
          {/* Right-Aligned Navigation & Buttons */}
          <Nav className="ms-auto d-flex align-items-center fs-5">
            <Nav.Link as={Link} to="/reel-critic/home" className="text-light mx-3 nav-item">Home</Nav.Link>
            <Nav.Link as={Link} to="/reel-critic/movies" className="text-light mx-3 nav-item">Movies</Nav.Link>
            <Nav.Link as={Link} to="/reel-critic/tvshows" className="text-light mx-3 nav-item">TV Shows</Nav.Link>
            <Nav.Link as={Link} to="/reel-critic/series" className="text-light mx-3 nav-item">Series</Nav.Link>
            <Nav.Link as={Link} to="/reel-critic/trending" className="text-light mx-3 nav-item">Trending</Nav.Link>

            {/* Enhanced Netflix-style Search Bar */}
            <Form className="d-flex mx-3 custom-search">
              <div className="search-wrapper">
                <CiSearch className="search-icon" />
                <FormControl 
                  type="search" 
                  placeholder="Search movies, TV shows..." 
                  className="search-input"
                />
              </div>
            </Form>

            {/* Login & Sign Up Buttons */}
            <Nav.Link as={Link} to="/reel-critic/account/login">
  <Button variant="outline-light" className="custom-login-btn">Login</Button>
</Nav.Link>
<Nav.Link as={Link} to="/reel-critic/account/register">
  <Button className="custom-signup-btn">Sign Up</Button>
</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
