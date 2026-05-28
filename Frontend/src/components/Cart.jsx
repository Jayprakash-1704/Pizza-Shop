import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, getTotal } =
    useContext(CartContext);

  // ---------------- Empty Cart ----------------
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-orange-50 via-white to-red-50 px-4">
        
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-orange-100">
          
          <div className="text-8xl mb-6">🛒</div>

          <h1 className="text-4xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 text-lg mb-8">
            Looks like you haven’t added any delicious pizzas yet.
          </p>

          <Link
            to="/menu"
            className="inline-block px-8 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            Browse Menu 🍕
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- Main Cart ----------------
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            🛒 Your Delicious Cart
          </div>

          <h1 className="text-5xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Shopping Cart
          </h1>

          <p className="text-gray-500 text-lg mt-4">
            Review your selected pizzas before checkout
          </p>
        </div>

        {/* Cart Layout */}
        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-orange-100"
              >
                
                <div className="flex flex-col md:flex-row">
                  
                  {/* Image */}
                  <div className="md:w-52 h-52 overflow-hidden">
                    <img
                      src={
                        item.pizza.image ||
                        "/pizza-placeholder.jpg"
                      }
                      alt={item.pizza.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            {item.pizza.name}
                          </h2>

                          <p className="text-gray-500 mt-2">
                            Freshly baked with premium ingredients 🍕
                          </p>
                        </div>

                        <div className="bg-linear-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl font-bold shadow-md">
                          ₹
                          {(
                            item.price * item.quantity
                          ).toFixed(2)}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-5 grid sm:grid-cols-3 gap-4">
                        
                        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
                          <p className="text-sm text-gray-500">
                            Size
                          </p>

                          <p className="font-bold text-gray-800 capitalize">
                            {item.size}
                          </p>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
                          <p className="text-sm text-gray-500">
                            Quantity
                          </p>

                          <p className="font-bold text-gray-800">
                            {item.quantity}
                          </p>
                        </div>

                        <div className="bg-orange-50 rounded-2xl p-3 border border-orange-100">
                          <p className="text-sm text-gray-500">
                            Toppings
                          </p>

                          <p className="font-bold text-gray-800 text-sm">
                            {item.toppings.join(", ") ||
                              "None"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() =>
                          removeFromCart(index)
                        }
                        className="px-5 py-2 rounded-xl bg-red-100 text-red-600 font-semibold hover:bg-red-500 hover:text-white transition duration-300"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 sticky top-28">
              
              <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
                Order Summary
              </h2>

              <div className="space-y-5">
                
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-semibold">
                    Free
                  </span>
                </div>

                <div className="border-t pt-5 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-800">
                    Total
                  </span>

                  <span className="text-3xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    ₹{getTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="block w-full text-center mt-8 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition duration-300"
              >
                Proceed to Checkout 🚀
              </Link>

              {/* Continue Shopping */}
              <Link
                to="/menu"
                className="block text-center mt-5 text-orange-500 font-semibold hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;