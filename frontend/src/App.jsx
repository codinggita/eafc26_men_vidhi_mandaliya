import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Toaster, toast } from 'react-hot-toast';
import { FaRunning, FaChartBar } from 'react-icons/fa';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';

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

const Home = () => {
  const notify = () => toast.success('Tailwind + MUI + Redux configured successfully!');

  return (
    <div className="flex flex-col justify-center items-center p-6 min-h-[calc(100vh-10rem)]">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6 animate-fade-in">
        <div className="inline-flex p-4 bg-indigo-500/10 rounded-2xl text-indigo-500">
          <FaChartBar size={40} />
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          EAFC 26 Analytics
        </h1>
        
        <p className="text-slate-400 text-sm leading-relaxed">
          Authentication and protected routes have been successfully enabled! Welcome to the Player Analytics console.
        </p>

        <div className="flex justify-center gap-3">
          <Button variant="contained" color="primary" onClick={notify} startIcon={<FaRunning />}>
            Test Setup
          </Button>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-around text-xs text-slate-500 font-mono">
          <span>Vite + Tailwind v4</span>
          <span>MUI v5</span>
          <span>Redux Toolkit</span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
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
              <Route index element={<Home />} />
              {/* Other pages can be added as child routes when implemented */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster position="bottom-right" />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
