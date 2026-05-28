import React, { useState } from "react";

const PizzaCard = ({ pizza, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("medium");
  const [toppings, setToppings] = useState([]);

  const availableToppings = [
    "Cheese",
    "Olives",
    "Mushrooms",
    "Pepperoni",
  ];

  const toggleTopping = (topping) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const handleAddToCart = () => {
    onAddToCart(pizza, quantity, size, toppings);
  };

  const totalPrice = pizza.price * quantity;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-orange-100">
      
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={pizza.image || "/pizza-placeholder.jpg"}
          alt={pizza.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
        />

        {/* linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent"></div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl shadow-lg font-bold text-lg">
          ₹{pizza.price}
        </div>

        {/* Floating Label */}
        <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30">
          <span className="text-white font-semibold text-sm">
            🍕 Chef Special
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        
        {/* Title */}
        <div>
          <h3 className="text-2xl font-extrabold text-gray-800">
            {pizza.name}
          </h3>

          <p className="text-gray-500 mt-2 leading-relaxed text-sm">
            {pizza.description}
          </p>
        </div>

        {/* Size Selector */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-3">
            Choose Size
          </label>

          <div className="flex gap-3">
            {["small", "medium", "large"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-2 rounded-2xl font-semibold text-sm capitalize transition-all duration-300 ${
                  size === s
                    ? "bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Toppings */}
        <div>
          <label className="text-sm font-bold text-gray-700 block mb-3">
            Extra Toppings
          </label>

          <div className="flex flex-wrap gap-2">
            {availableToppings.map((topping) => (
              <button
                key={topping}
                onClick={() => toggleTopping(topping)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  toppings.includes(topping)
                    ? "bg-green-500 text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-orange-100"
                }`}
              >
                {topping}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity + Total */}
        <div className="flex items-center justify-between bg-orange-50 rounded-2xl p-4">
          
          {/* Quantity */}
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Quantity
            </p>

            <div className="flex items-center bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100">
              <button
                onClick={() =>
                  setQuantity(Math.max(1, quantity - 1))
                }
                className="px-4 py-2 text-lg font-bold hover:bg-orange-100 transition"
              >
                −
              </button>

              <span className="px-5 font-bold text-gray-800">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-lg font-bold hover:bg-orange-100 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Total Price
            </p>

            <h3 className="text-2xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              ₹{totalPrice}
            </h3>
          </div>
        </div>

        {/* Add To Cart */}
        <button
          onClick={handleAddToCart}
          className="w-full py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
        >
          Add to Cart 🍕
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;