import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { loginUser, clearError } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';

// Yup Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If login is successful and token is present, redirect to home
    if (token) {
      navigate('/');
    }
    // Clean up auth errors when mounting
    dispatch(clearError());
  }, [token, navigate, dispatch]);

  const handleSubmit = (values) => {
    dispatch(loginUser(values)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Successfully logged in!');
      } else {
        toast.error(result.payload || 'Login failed');
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-slate-950 p-4 animate-fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl text-indigo-500 mb-2">
            <FaSignInAlt size={28} />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-400">
            Sign in to access your EAFC 26 dashboard
          </p>
        </div>

        {/* Form */}
        <Formik
          initialValues={{ email: 'vidhimandaliya81@gmail.com', password: '123456789' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 text-left">
              
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <FaEnvelope className="absolute left-4 text-slate-500" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-800/80 border text-slate-100 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all ${
                      errors.email && touched.email ? 'border-red-500' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-xs text-red-500 font-medium pl-1" />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <FaLock className="absolute left-4 text-slate-500" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={`w-full pl-11 pr-4 py-3 bg-slate-800/80 border text-slate-100 rounded-xl placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all ${
                      errors.password && touched.password ? 'border-red-500' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-xs text-red-500 font-medium pl-1" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-500/50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In</span>
                    <FaSignInAlt size={14} />
                  </>
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer info link */}
        <div className="text-center pt-2 text-sm text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
