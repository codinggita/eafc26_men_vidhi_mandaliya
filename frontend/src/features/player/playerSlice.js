import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk: Fetch players with filters & pagination
export const fetchPlayers = createAsyncThunk(
  'player/fetchPlayers',
  async (filters, { rejectWithValue }) => {
    try {
      // Build query parameters
      const params = {};
      if (filters.page) params.page = filters.page;
      if (filters.limit) params.limit = filters.limit;
      if (filters.sort) params.sort = filters.sort;
      if (filters.q) params.q = filters.q;
      if (filters.team) params.team = filters.team;
      if (filters.league) params.league = filters.league;
      if (filters.nation) params.nation = filters.nation;
      if (filters.position) params.position = filters.position;
      
      const response = await api.get('/players', { params });
      return response.data.data; // Response returns { players, pagination: { total, page, limit, pages } }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch players';
      return rejectWithValue(message);
    }
  }
);

// Async Thunk: Fetch individual player details
export const fetchPlayerDetails = createAsyncThunk(
  'player/fetchPlayerDetails',
  async (playerId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/players/${playerId}`);
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch player details';
      return rejectWithValue(message);
    }
  }
);

// Async Thunk: Fetch combined player database statistics
export const fetchPlayerStats = createAsyncThunk(
  'player/fetchPlayerStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/stats/players');
      return response.data.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch stats';
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  players: [],
  selectedPlayer: null,
  stats: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  },
  filters: {
    page: 1,
    limit: 10,
    sort: '-ovr', // default sort by rating descending
    q: '',
    team: '',
    league: '',
    nation: '',
    position: '',
  },
  loading: false,
  statsLoading: false,
  error: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload, page: 1 }; // reset page to 1 on filter changes
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearPlayerError: (state) => {
      state.error = null;
    },
    clearSelectedPlayer: (state) => {
      state.selectedPlayer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Players
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload.players;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Player Details
      .addCase(fetchPlayerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedPlayer = null;
      })
      .addCase(fetchPlayerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlayer = action.payload;
      })
      .addCase(fetchPlayerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Stats
      .addCase(fetchPlayerStats.pending, (state) => {
        state.statsLoading = true;
      })
      .addCase(fetchPlayerStats.fulfilled, (state, action) => {
        state.statsLoading = false;
        state.stats = action.payload;
      })
      .addCase(fetchPlayerStats.rejected, (state) => {
        state.statsLoading = false;
      });
  },
});

export const { setFilters, setPage, resetFilters, clearPlayerError, clearSelectedPlayer } = playerSlice.actions;
export default playerSlice.reducer;
