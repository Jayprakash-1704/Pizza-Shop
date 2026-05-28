// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Pizza from './models/pizza.models.js';



const pizzas = [
  {
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    price: 299,
    category: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
  },
  {
    name: 'Pepperoni',
    description: 'Traditional pepperoni pizza with cheese and tomato sauce',
    price: 149,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400'
  },
  {
    name: 'BBQ Chicken',
    description: 'Grilled chicken with BBQ sauce, red onions, and cilantro',
    price: 169,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1655471264223-b07ce84d521c?q=80&w=811&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },

  
  {
    name: 'Vegetarian Supreme',
    description: 'Loaded with bell peppers, mushrooms, onions, and olives',
    price: 159,
    category: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
  },
  {
    name: 'Hawaiian',
    description: 'Ham and pineapple with mozzarella cheese',
    price: 139,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400'
  },
  {
    name: 'Meat Lovers',
    description: 'Pepperoni, sausage, bacon, and ham',
    price: 189,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400'
  },
  {
    name: 'Vegan Delight',
    description: 'Tomato sauce, vegan cheese, mushrooms, spinach, and olives',
    price: 599,
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400'
  },
  {
    name: 'Spicy Diablo',
    description: 'Spicy salami, jalapeños, red onions, and hot sauce',
    price: 599,
    category: 'Spicy',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400'
  },
  {
    name: 'Four Cheese',
    description: 'Mozzarella, cheddar, parmesan, and gorgonzola',
    price: 599,
    category: 'Vegetarian',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400'
  },
  
];

const seedDB = async () => {
  try {
    console.log(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL, );
    await Pizza.deleteMany({});
    await Pizza.insertMany(pizzas);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();