import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { orderAPI } from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const res = await orderAPI.getUserOrders();
          setOrders(res);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [user]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700 border border-green-200";
      case "preparing":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-blue-100 text-blue-700 border border-blue-200";
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md w-full">
          <div className="text-6xl mb-4">🍕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Login Required
          </h2>
          <p className="text-gray-500">
            Please login to view your delicious orders.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-linear-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            My Orders
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Track all your delicious pizza orders 🍕
          </p>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="text-7xl mb-5">🛵</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-500">
              Looks like you haven't ordered any pizza yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
              >
                {/* Top Section */}
                <div className="bg-linear-to-r from-orange-500 to-red-500 p-6 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Order #{order._id.slice(-6)}
                      </h2>
                      <p className="text-orange-100 mt-1">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur-md ${getStatusStyles(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>

                      <div className="text-right">
                        <p className="text-sm text-orange-100">Total</p>
                        <p className="text-2xl font-bold">
                          ₹{order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-5">
                    Order Items
                  </h3>

                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 hover:bg-orange-50 transition"
                      >
                        <div>
                          <p className="font-semibold text-gray-800">
                            {item.pizza?.name || "Pizza unavailable"}
                          </p>

                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span>Size: {item.size}</span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>

                        <div className="text-2xl">🍕</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;