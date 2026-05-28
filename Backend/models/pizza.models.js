import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  toppings: [
    {
      type: String,
    },
  ],
  sizes: [
    {
      name: String,
      price: Number,
    },
  ],
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Pizza", pizzaSchema);
