import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-base-200 text-white py-8 mt-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-wrap justify-center sm:justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <img
              src="/tinder.webp"
              alt="Logo"
              className="h-8 w-8 rounded-full"
            />
            <h2 className="text-2xl font-bold">DevTinder</h2>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start space-x-6 mt-4 md:mt-0">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Profile
            </Link>
            <Link
              to="/connections"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Connections
            </Link>
            <Link
              to="/requests"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Requests
            </Link>
          </div>

          {/* Footer Info */}
          <div className="text-center md:text-left mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} DevTinder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
