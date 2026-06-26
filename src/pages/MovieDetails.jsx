import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../redux/movieSlice";
import "../styles/movieDetails.scss";

export default function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useSelector((state) => state.movies.favorites);
  const movie = useSelector((state) =>
    state.movies.movies.find((m) => m.id == id)
  );

  if (!movie) return <h2 className="not-found">Movie not found</h2>;

  const isInFavorites = favorites.some((fav) => fav.id === movie.id);

  const handleFavoriteClick = () => {
    if (isInFavorites) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
    setIsFavorite(!isFavorite);
  };

  const cast = [
    { id: 1, name: "Actor 1", image: movie.poster_path },
    { id: 2, name: "Actor 2", image: movie.poster_path },
    { id: 3, name: "Actor 3", image: movie.poster_path },
    { id: 4, name: "Actor 4", image: movie.poster_path },
    { id: 5, name: "Actor 5", image: movie.poster_path },
  ];

  return (
    <div className="movie-details">
      <div className="hero-details">
        <div
          className="hero-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="hero-overlay"></div>
        </div>

        <div className="details-content">
          <div className="details-left">
            <span className="badge">Next Chapter</span>

            <h1 className="movie-title">{movie.title}</h1>

            <div className="movie-metadata">
              <div className="meta-item">
                <span className="meta-label">IMDb</span>
                <span className="meta-value">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🔊</span>
                <span className="meta-value">English</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">15+</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">2h 55m 30s</span>
              </div>
            </div>

            <p className="movie-overview">{movie.overview}</p>

            <div className="action-buttons">
              <button className="btn btn-ticket">Buy Ticket</button>
              <button className="btn btn-play">▶ Play Now</button>
              <button
                className={`btn btn-favorite ${isInFavorites ? "active" : ""}`}
                onClick={handleFavoriteClick}
              >
                ♥
              </button>
            </div>
          </div>

          <div className="details-right">
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster-detail"
            />
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="cast-section">
        <h2 className="section-title">Cast</h2>
        <div className="cast-carousel">
          <button className="carousel-btn prev">❮</button>
          <div className="cast-grid">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-member">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.image}`}
                  alt={actor.name}
                />
                <p className="cast-name">{actor.name}</p>
              </div>
            ))}
          </div>
          <button className="carousel-btn next">❯</button>
        </div>
      </div>
    </div>
  );
}