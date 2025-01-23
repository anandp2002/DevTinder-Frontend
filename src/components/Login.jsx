import LOGO from '/tinder.webp';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [emailId, setEmailId] = useState('@gmail.com');
  const [password, setPassword] = useState('@123');
  const [error, setError] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login function
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        BASE_URL + '/auth/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); // Add user data to the store
      navigate('/');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong !');
    }
  };

  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        BASE_URL + '/auth/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data)); // Add user data to the store
      return navigate('/profile');
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong !');
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            isLoginForm ? handleLogin(e) : handleSignUp(e);
          }}
        >
          {!isLoginForm && (
            <>
              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </span>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                />
              </label>
              <label className="block mb-4">
                <span className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </span>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                />
              </label>
            </>
          )}
          <label className="block mb-4">
            <span className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </span>
            <input
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            />
          </label>

          {/* Login or SignUp Button */}
          <div className="mb-6">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-950 transition duration-200"
            >
              <LogIn />
              {isLoginForm ? 'Login' : 'Sign Up'}
            </button>
          </div>
          {isLoginForm ? (
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Don’t have an account ?{' '}
                <span
                  onClick={() => setIsLoginForm(false)}
                  className="text-blue-500 hover:text-blue-400 cursor-pointer"
                >
                  Sign up now
                </span>
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Already have an account ?{' '}
                <span
                  onClick={() => setIsLoginForm(true)}
                  className="text-blue-500 hover:text-blue-400 cursor-pointer"
                >
                  Login here
                </span>
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
