import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchMovies } from "../redux/movieSlice";
import { useState } from "react";
import "../styles/Navbar.scss";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchMovies(query));
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <div className="logo">
            <span className="logo-icon">🎬</span>
            <span className="logo-text">Pixaro</span>
          </div>
        </Link>

        {/* Menu */}
        <ul className="menu">
          <li>
            <Link to="/" className="menu-link">Home</Link>
          </li>
          <li>
            <Link to="/favorites" className="menu-link">Favorites</Link>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </nav>
  );
}