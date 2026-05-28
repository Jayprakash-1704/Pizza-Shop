# Pizza Shop MERN App

A full-stack pizza ordering application built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication (register/login)
- Browse pizza menu
- Add pizzas to cart with customizations (size, toppings)
- Place orders with delivery address
- View order history
- Admin features (add/edit pizzas)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcrypt for password hashing

### Frontend
- React.js with Vite
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Context API for state management

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create .env file with:
   ```
   MONGO_URI=mongodb://localhost:27017/pizza-shop
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Pizzas
- GET /api/pizzas - Get all pizzas
- GET /api/pizzas/:id - Get pizza by ID
- POST /api/pizzas - Create pizza (admin)
- PUT /api/pizzas/:id - Update pizza (admin)
- DELETE /api/pizzas/:id - Delete pizza (admin)

### Users
- POST /api/users/register - Register user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile

### Orders
- GET /api/orders - Get user's orders
- GET /api/orders/:id - Get order by ID
- POST /api/orders - Create order
- PUT /api/orders/:id - Update order status (admin)

## Usage

1. Register a new account or login
2. Browse the pizza menu
3. Add pizzas to cart with desired size and toppings
4. Proceed to checkout
5. Enter delivery address and payment method
6. Place the order
7. View order history in "My Orders"

## Future Enhancements

- Payment integration
- Real-time order tracking
- Admin dashboard
- Image upload for pizzas
- Reviews and ratings
- Mobile app