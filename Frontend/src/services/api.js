import axios from "axios";

const API = axios.create({
  baseURL: "https://pizza-shop-backend-wdx7.onrender.com/api",
  withCredentials: true,
});

// ----------------- Pizza API -----------------
export const pizzaAPI = {
  getAll: async () => {
    const res = await API.get("/pizzas");
    return res.data.pizzas || [];
  },
  getById: async (id) => {
    const res = await API.get(`/pizzas/${id}`);
    return res.data.pizza;
  },
};

// ----------------- Order API -----------------
export const orderAPI = {
  getUserOrders: async () => {
    const res = await API.get("/orders");
    return res.data.orders || [];
  },
  createOrder: async (order) => {
    const res = await API.post("/orders", order);
    return res.data.order;
  },
};

// ----------------- User/Auth API -----------------
export const userAPI = {
  register: async (user) => {
    const res = await API.post("/users/register", user);
    return res.data;
  },
  login: async (user) => {
    const res = await API.post("/users/login", user);
    return res.data;
  },
  getProfile: async () => {
    const res = await API.get("/users/profile");
    return res.data;
  },
  updateProfile: async (user) => {
    const res = await API.put("/users/profile", user);
    return res.data;
  },
  logout: async () => {
    const res = await API.post("/users/logout");
    return res.data;
  },
};

export default API;
