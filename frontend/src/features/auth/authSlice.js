import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Initial state loading session from localStorage
const storedToken = localStorage.getItem('eafc_token') || null;
let storedUser = null;
try {
  const userJson = localStorage.getItem('eafc_user');
  if (userJson) storedUser = JSON.parse(userJson);
} catch (e) {
  console.error('Failed to parse stored user session:', e);
}

const initialState = {
  user: storedUser,
  token: storedToken,
  loading: false,
  error: null,
};

// Async Thunk: Login User
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { data } = response.data; // Response structure: { success: true, message, data: { user, token } }
      
      // Save credentials in localStorage
      localStorage.setItem('eafc_token', data.token);
      localStorage.setItem('eafc_user', JSON.stringify(data.user));
      
      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      return rejectWithValue(message);
    }
  }
);

// Async Thunk: Register User
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { data } = response.data;

      // Save credentials in localStorage
      localStorage.setItem('eafc_token', data.token);
      localStorage.setItem('eafc_user', JSON.stringify(data.user));

      return data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem('eafc_token');
      localStorage.removeItem('eafc_user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User Actions
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register User Actions
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
