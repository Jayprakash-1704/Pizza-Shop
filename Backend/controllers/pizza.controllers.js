import Pizza from '../models/pizza.models.js';

// Get all pizzas
export const getAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.status(200).json({
      success: true,
      pizzas,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get pizza by ID
export const getPizzaById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.json(pizza);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create pizza (admin only)
export const createPizza = async (req, res) => {
  const pizza = new Pizza(req.body);
  try {
    const newPizza = await pizza.save();
    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update pizza (admin only)
export const updatePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.json(pizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete pizza (admin only)
export const deletePizza = async (req, res) => {
  try {
    const pizza = await Pizza.findByIdAndDelete(req.params.id);
    if (!pizza) return res.status(404).json({ message: 'Pizza not found' });
    res.json({ message: 'Pizza deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
