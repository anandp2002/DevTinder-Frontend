import { LogIn } from 'lucide-react';
import LOGO from '/tinder.webp';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState('anand@gmail.com');
  const [password, setPassword] = useState('Anand@123');

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        'http://localhost:3000/auth/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-800 to-gray-950 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <img src={LOGO} alt="Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-3xl font-bold text-center">Get Started</h1>
        </div>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </span>
            <input
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            />
          </label>

          {/* Password Input */}
          <label className="block mb-6">
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </span>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            />
          </label>

          {/* Login Button */}
          <div className="mb-6">
            <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-950 transition duration-200">
              <LogIn />
              Login
            </button>
          </div>
        </form>

        {/* Signup Prompt */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don’t have an account?{' '}
            <span className="text-blue-500 underline hover:text-blue-400 cursor-pointer">
              Sign up now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
