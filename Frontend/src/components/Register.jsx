import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await register(
        formData.name,
        formData.email,
        formData.password
      );

      navigate("/");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50 px-4 py-10">
      
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">

          {/* Header */}
          <div className="bg-linear-to-r from-orange-500 to-red-500 p-8 text-center">
            
            <div className="text-6xl mb-4">
              🍕
            </div>

            <h1 className="text-4xl font-extrabold text-white">
              Join Pizza Shop
            </h1>

            <p className="text-orange-100 mt-3 text-lg">
              Create your account and start ordering delicious pizzas
            </p>
          </div>

          {/* Form */}
          <div className="p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition duration-300"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition duration-300"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:bg-white transition duration-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition duration-300 disabled:opacity-70"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account 🚀"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-8">
              
              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="px-4 text-gray-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              
              <p className="text-gray-500">
                Already have an account?
              </p>

              <Link
                to="/login"
                className="inline-block mt-4 px-6 py-3 rounded-2xl border border-orange-300 text-orange-600 font-semibold hover:bg-orange-50 transition duration-300"
              >
                Login Instead
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Hot pizzas • Fast delivery • Great taste 🍕
        </p>
      </div>
    </div>
  );
};

export default Register;