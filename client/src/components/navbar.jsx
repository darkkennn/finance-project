import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h3 className="text-white text-xl">
        <Link to="/">FinanceTracker</Link>
      </h3>
      <ul className="flex items-center">
        {isAuthenticated ? (
          // Links to show if user IS logged in
          <>
            <li className="text-white mr-4">
              Welcome, {user ? user.name : ''}
            </li>
            <li>
              <button 
                onClick={logout} 
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          // Links to show if user is NOT logged in
          <>
            <li className="mx-3">
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-gray-300">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;