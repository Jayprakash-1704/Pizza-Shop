import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { orderAPI } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Checkout = () => {
  const { cart, getTotal, clearCart } =
    useContext(CartContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] =
    useState({
      street: "",
      city: "",
      zipCode: "",
    });

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const order = {
        items: cart.map((item) => ({
          pizza: item.pizza._id,
          quantity: item.quantity,
          size: item.size,
          toppings: item.toppings,
        })),

        totalAmount: getTotal(),
        deliveryAddress,
        paymentMethod,
      };

      await orderAPI.createOrder(order);

      clearCart();

      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- Not Logged In ----------------
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50 px-4">
        
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-orange-100">
          
          <div className="text-7xl mb-6">🔒</div>

          <h1 className="text-4xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Login Required
          </h1>

          <p className="text-gray-500 text-lg mb-8">
            Please login to continue with checkout.
          </p>

          <Link
            to="/login"
            className="inline-block px-8 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- Empty Cart ----------------
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-orange-50 via-white to-red-50 px-4">
        
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-orange-100">
          
          <div className="text-7xl mb-6">🛒</div>

          <h1 className="text-4xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Cart is Empty
          </h1>

          <p className="text-gray-500 text-lg mb-8">
            Add some delicious pizzas before checkout.
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

  // ---------------- Main Checkout ----------------
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-5 py-2 rounded-full text-sm font-semibold mb-5">
            🚀 Fast & Secure Checkout
          </div>

          <h1 className="text-5xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Checkout
          </h1>

          <p className="text-gray-500 text-lg mt-4">
            Complete your order and enjoy delicious pizza 🍕
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100"
            >
              
              {/* Delivery Address */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Delivery Address
                </h2>

                <div className="space-y-5">

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your street"
                      value={deliveryAddress.street}
                      onChange={(e) =>
                        setDeliveryAddress({
                          ...deliveryAddress,
                          street: e.target.value,
                        })
                      }
                      className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        City
                      </label>

                      <input
                        type="text"
                        placeholder="Enter city"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            city: e.target.value,
                          })
                        }
                        className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ZIP Code
                      </label>

                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={deliveryAddress.zipCode}
                        onChange={(e) =>
                          setDeliveryAddress({
                            ...deliveryAddress,
                            zipCode: e.target.value,
                          })
                        }
                        className="w-full p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-10">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Payment Method
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("cash")
                    }
                    className={`p-5 rounded-2xl border-2 transition text-left ${
                      paymentMethod === "cash"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-3">💵</div>

                    <h3 className="font-bold text-gray-800">
                      Cash on Delivery
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Pay when your order arrives
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                    className={`p-5 rounded-2xl border-2 transition text-left ${
                      paymentMethod === "card"
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="text-3xl mb-3">💳</div>

                    <h3 className="font-bold text-gray-800">
                      Credit / Debit Card
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Secure online payment
                    </p>
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-10 py-4 rounded-2xl bg-linear-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition duration-300 disabled:opacity-70"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order 🍕"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-orange-100 sticky top-28">
              
              <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-5 max-h-80 overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start gap-4 bg-orange-50 rounded-2xl p-4"
                  >
                    
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {item.pizza.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.size} • Qty {item.quantity}
                      </p>
                    </div>

                    <span className="font-bold text-orange-600">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t mt-8 pt-6 space-y-4">
                
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

                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-xl font-bold text-gray-800">
                    Total
                  </span>

                  <span className="text-3xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    ₹{getTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Security Note */}
              <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-4">
                <p className="text-green-700 text-sm font-medium">
                  🔒 Secure checkout with safe payment processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;