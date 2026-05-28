/* eslint-disable react-hooks/set-state-in-effect */
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { CartContext } from "../context/CartContext.jsx";
import PizzaCard from "./PizzaCard.jsx";
import { pizzaAPI } from "../services/api.js";

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useContext(CartContext);

  const fetchPizzas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const pizzasData = await pizzaAPI.getAll();
      setPizzas(pizzasData);
    } catch (err) {
      console.error(err);
      setError("Failed to load menu. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  if (!addToCart) {
    throw new Error("Menu must be used inside CartContext Provider");
  }

  // ---------------- Loading ----------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Preparing Your Menu 🍕
          </h2>

          <p className="text-gray-500">
            Loading delicious pizzas...
          </p>
        </div>
      </div>
    );
  }

  // ---------------- Error ----------------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full border border-red-100">
          
          <div className="text-6xl mb-5">😕</div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Something Went Wrong
          </h2>

          <p className="text-red-500 font-medium">
            {error}
          </p>

          <button
            onClick={fetchPizzas}
            className="mt-7 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---------------- Empty ----------------
  if (!pizzas.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-12 text-center max-w-lg w-full">
          
          <div className="text-7xl mb-6">🍕</div>

          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            No Pizzas Available
          </h2>

          <p className="text-gray-500 text-lg">
            Our chefs are preparing fresh pizzas for you.
            Please check back later.
          </p>
        </div>
      </div>
    );
  }

  // ---------------- Main UI ----------------
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-12">
      
      <div className="max-w-7xl mx-auto px-4">

        {/* Hero Section */}
        <div className="text-center mb-14">
          
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            🍕 Freshly Baked Everyday
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight">
            Our Delicious Menu
          </h1>

          <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
            Explore our handcrafted pizzas made with premium ingredients,
            cheesy goodness, and authentic flavors.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          
          <div className="bg-white rounded-2xl shadow-md p-5 text-center border border-orange-100">
            <div className="text-3xl mb-2">🍕</div>
            <h3 className="text-2xl font-bold text-gray-800">
              {pizzas.length}
            </h3>
            <p className="text-gray-500 text-sm">
              Pizza Varieties
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center border border-orange-100">
            <div className="text-3xl mb-2">🔥</div>
            <h3 className="text-2xl font-bold text-gray-800">
              Fresh
            </h3>
            <p className="text-gray-500 text-sm">
              Oven Baked
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center border border-orange-100">
            <div className="text-3xl mb-2">🧀</div>
            <h3 className="text-2xl font-bold text-gray-800">
              Premium
            </h3>
            <p className="text-gray-500 text-sm">
              Ingredients
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-5 text-center border border-orange-100">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="text-2xl font-bold text-gray-800">
              Fast
            </h3>
            <p className="text-gray-500 text-sm">
              Delivery
            </p>
          </div>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pizzas.map((pizza) => (
            <div
              key={pizza._id}
              className="transform hover:-translate-y-3 hover:scale-[1.02] transition duration-300"
            >
              <PizzaCard
                pizza={pizza}
                onAddToCart={addToCart}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;