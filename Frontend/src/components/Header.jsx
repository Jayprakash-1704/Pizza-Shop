import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-2xl shadow-lg group-hover:scale-105 transition">
              🍕
            </div>

            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Pizza Shop
              </h1>
              <p className="text-xs text-gray-400 -mt-1">
                Fresh & Delicious
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/menu"
              className="text-gray-700 hover:text-orange-500 font-medium transition"
            >
              Menu
            </Link>

            {user ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-orange-500 font-medium transition"
                >
                  My Orders
                </Link>

                <Link
                  to="/cart"
                  className="relative text-gray-700 hover:text-orange-500 font-medium transition"
                >
                  Cart

                  {cart.length > 0 && (
                    <span className="absolute -top-3 -right-5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                      {cart.length}
                    </span>
                  )}
                </Link>

                {/* User */}
                <div className="flex items-center gap-3 ml-4 bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Welcome</p>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="ml-3 px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl border border-orange-200 text-orange-500 font-semibold hover:bg-orange-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-3xl text-orange-500"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-6 space-y-4">
            <Link
              to="/menu"
              className="block text-gray-700 font-medium hover:text-orange-500"
            >
              Menu
            </Link>

            {user ? (
              <>
                <Link
                  to="/orders"
                  className="block text-gray-700 font-medium hover:text-orange-500"
                >
                  My Orders
                </Link>

                <Link
                  to="/cart"
                  className="block text-gray-700 font-medium hover:text-orange-500"
                >
                  Cart ({cart.length})
                </Link>

                <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-2xl border border-orange-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Logged in as</p>
                    <p className="font-semibold text-gray-800">
                      {user.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="text-center px-5 py-3 rounded-xl border border-orange-200 text-orange-500 font-semibold"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="text-center px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;