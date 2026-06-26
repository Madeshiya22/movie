import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending, searchMovies } from "../redux/movieSlice";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";
import "../styles/Home.scss";

const genres = [
  "Action", "Adventure", "Anime", "Biography",
  "Crime", "Comedy", "Documentary", "Drama", "Fantasy", "Thriller"
];

const categories = [
  { name: "Trending Now", id: "trending" },
  { name: "Popular", id: "popular" },
  { name: "Top Rated", id: "top_rated" },
  { name: "Upcoming", id: "upcoming" },
];

export default function Home() {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("trending");

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  const featuredMovie = movies?.[0];

  const handleGenreClick = (genre) => {
    setSelectedGenre(selectedGenre === genre ? null : genre);
  };

  if (loading) return <Loader />;

  return (
    <div className="home">
      {error && (
        <div className="api-error" role="alert">
          <div>
            <h2>Unable to load movies</h2>
            <p>{error}</p>
          </div>
          <button type="button" onClick={() => dispatch(fetchTrending())}>
            Retry
          </button>
        </div>
      )}

      {/* Hero Section */}
      {featuredMovie && (
        <div className="hero-section">
          <div
            className="hero-background"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
            }}
          >
            <div className="hero-overlay"></div>
          </div>

          <div className="hero-content">
            <div className="hero-left">
              <div className="movie-meta">
                <span className="rating">⭐ {featuredMovie.vote_average?.toFixed(1)}</span>
                <span className="year">2024</span>
                <span className="duration">2 Seasons</span>
              </div>

              <h1 className="hero-title">{featuredMovie.title}</h1>

              <p className="hero-description">{featuredMovie.overview}</p>

              <div className="hero-buttons">
                <button className="btn btn-play">▶ WATCH</button>
                <button className="btn btn-list">+ ADD TO LIST</button>
              </div>
            </div>

            <div className="hero-right">
              <img
                src={`https://image.tmdb.org/t/p/w400${featuredMovie.poster_path}`}
                alt={featuredMovie.title}
                className="hero-poster"
              />
            </div>
          </div>
        </div>
      )}

      {/* Category Filters */}
      <div className="category-filters">
        <h3 className="filter-label">Categories</h3>
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Filters */}
      <div className="genre-filters">
        <h3 className="filter-label">Genres</h3>
        <div className="filter-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              className={`filter-btn ${selectedGenre === genre ? "active" : ""}`}
              onClick={() => handleGenreClick(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movies Grid */}
      <div className="movies-section">
        <div className="movies-grid">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="no-movies">No movies found</div>
          )}
        </div>
      </div>
    </div>
  );
}
