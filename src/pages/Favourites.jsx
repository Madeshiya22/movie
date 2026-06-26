import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import "../styles/Favourites.scss";

export default function Favourites() {
  const favourites = useSelector((state) => state.movies.favorites);

  return (
    <div className="favourites-page">
      {/* Header Section */}
      <div className="favourites-header">
        <div className="header-content">
          <h1 className="page-title">♥ My Favorites</h1>
          <p className="header-subtitle">
            {favourites.length > 0
              ? `You have ${favourites.length} movie${favourites.length !== 1 ? "s" : ""} in your favorites`
              : "Start adding your favorite movies"}
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      <div className="favourites-section">
        {favourites.length > 0 ? (
          <div className="favourites-grid">
            {favourites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <h2 className="empty-title">No Favorites Yet</h2>
            <p className="empty-description">
              Your favorite list is empty. Start exploring and add movies you love!
            </p>
            <a href="/" className="empty-link">
              ⬅ Back to Home
            </a>
          </div>
        )}
      </div>
    </div>
  );
}