import {
  Navbar,
  Nav,
  Button,
  Container,
  Form,
  FormControl,
  ListGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { useEffect, useRef, useState } from "react";
import { fetchAutocompleteMovies } from "../../services/api";

export default function Navigation() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch autocomplete suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowDropdown(false); // ✅ Hide dropdown when query is empty
        return;
      }

      const results = await fetchAutocompleteMovies(query);
      console.log("🔍 Autocomplete Results in UI:", results);
      setSuggestions(results);
      setShowDropdown(results.length > 0); // ✅ Show dropdown if results exist
    };

    fetchSuggestions();
  }, [query]);

  // ✅ Modified to navigate to search with movie details
  const handleSelect = (movie: any) => {
    // Navigate to search component with selected movie data
    navigate(`/reel-critic/search?id=${movie.id}`, {
      state: { selectedMovie: movie, fromSearch: true }
    });
    
    // Clear search UI
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false); 
  };

  // ✅ Prevent default form submission on Enter key
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/reel-critic/search?query=${query}`);
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar bg="black" expand="lg" fixed="top" className="px-4">
      <Container fluid>
        {/* Left-Aligned Brand Name */}
        <Navbar.Brand
          as={Link}
          to="/reel-critic"
          className="fw-bold text-uppercase text-light fs-1"
        >
          <span style={{ color: "white" }}>Reel</span>
          <span style={{ color: "red" }}>Critic</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Right-Aligned Navigation & Buttons */}
          <Nav className="ms-auto d-flex align-items-center fs-5">
            <Nav.Link
              as={Link}
              to="/reel-critic/home"
              className="text-light mx-3 nav-item"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reel-critic/movies"
              className="text-light mx-3 nav-item"
            >
              Movies
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reel-critic/tvshows"
              className="text-light mx-3 nav-item"
            >
              TV Shows
            </Nav.Link>
            
            <Nav.Link
              as={Link}
              to="/reel-critic/trending_movies"
              className="text-light mx-3 nav-item"
            >
              Trending
            </Nav.Link>

            {/* Enhanced Netflix-style Search Bar */}
            {/* Search Bar with Live Autocomplete */}
            <div className="search-container" ref={dropdownRef}>
              <Form className="d-flex mx-3 custom-search" onSubmit={handleSearch}>
                <div className="search-wrapper">
                  <CiSearch className="search-icon" />
                  <FormControl
                    type="search"
                    placeholder="Search movies, TV shows..."
                    className="search-input"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowDropdown(true);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                  />
                </div>
              </Form>
              {/* ✅ Display autocomplete suggestions */}
              {showDropdown && suggestions.length > 0 && (
                <ListGroup className="autocomplete-dropdown">
                  {suggestions.map((movie) => (
                    <ListGroup.Item
                      key={movie.id}
                      className="autocomplete-item"
                      onClick={() => handleSelect(movie)}
                    >
                      <img src={movie.poster || "/no-image.png"} alt={movie.title} className="autocomplete-img" />
                      <span>{movie.title} ({movie.type})</span>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </div>
            {/* Login & Sign Up Buttons */}
            <Nav.Link as={Link} to="/reel-critic/account/login">
              <Button variant="outline-light" className="custom-login-btn">
                Login
              </Button>
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