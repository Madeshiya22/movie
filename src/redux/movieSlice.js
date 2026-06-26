import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";

const fetchFromTmdb = async (path, params = {}) => {
  if (!API_KEY) {
    throw new Error("TMDB API key is missing. Add VITE_TMDB_KEY to your .env file.");
  }

  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_BASE_URL}${path}?${searchParams}`, {
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`TMDB request failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.results ?? [];
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("TMDB request timed out. Check your internet connection and try again.");
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const fetchTrending = createAsyncThunk(
  "movies/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchFromTmdb("/trending/movie/day");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      return await fetchFromTmdb("/search/movie", { query });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.find(
        (movie) => movie.id === action.payload.id,
      );

      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((m) => m.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Unable to fetch trending movies.";
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message || "Unable to search movies.";
      });
  },
});

export const { addFavorite, removeFavorite } = movieSlice.actions;
export default movieSlice.reducer;
