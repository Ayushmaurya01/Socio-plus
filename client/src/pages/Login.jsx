import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  const handleDemoLogin = async () => {
    setEmail('demo@socio.com');
    setPassword('123456');
    try {
      await login('demo@socio.com', '123456');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Demo Login failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-primary to-secondary p-12 text-white flex-col justify-center items-start">
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold mb-6">Socio Plus</h1>
          <p className="text-2xl opacity-90 leading-relaxed mb-12 max-w-lg">
            Connect with friends, share moments, explore more.
          </p>
          <Link to="/register" className="px-8 py-3 bg-white text-primary font-bold rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300">
            Join Now
          </Link>
        </motion.div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card p-10 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Sign in to continue to Socio Plus</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-gray-50"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary mt-2">
              Login
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">Or</span>
              </div>
            </div>
            <button 
              onClick={handleDemoLogin}
              className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all duration-300"
            >
              🚀 Login as Demo User
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account? <Link to="/register" className="text-primary font-semibold hover:underline">Register</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
