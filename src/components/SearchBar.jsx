    import { useDispatch } from "react-redux";
    import { searchMovies } from "../redux/movieSlice";
    import { useState } from "react";
    import "../styles/SearchBar.scss";

    export default function SearchBar() {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();

    const handleSearch = () => {
        dispatch(searchMovies(query));
    };

    return (
        <div className="search-bar">
      <input
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
    );
    }
