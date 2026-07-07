import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Compare from './pages/Compare';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import PlayerDetailsModal from './components/PlayerDetailsModal';
import { clearSelectedPlayer } from './features/player/playerSlice';

// Create dark MUI theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6', // indigo-500
    },
    secondary: {
      main: '#10b981', // emerald-500
    },
    background: {
      default: '#090a0f',
      paper: '#121420',
    },
  },
});

const PlayerDetailsModalWrapper = () => {
  const dispatch = useDispatch();
  return <PlayerDetailsModal onClose={() => dispatch(clearSelectedPlayer())} />;
};

const AppContent = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes (only accessible if logged out) */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected Routes (only accessible if logged in) */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="players" element={<Players />} />
            <Route path="compare" element={<Compare />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
      <PlayerDetailsModalWrapper />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
