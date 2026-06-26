import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/movieSlice";
import "../styles/MovieCard.scss";

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite(movie));
  };

  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(movie.id));
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>

      <div className="card-info">
        <h3>{movie.title}</h3>
        <p className="rating">⭐ {movie.vote_average}</p>
        <button onClick={handleAddFavorite}>♥ Add to Favorites</button>
        <button onClick={handleRemoveFavorite}>Remove from Favorites</button>
      </div>
    </div>
  );
}
