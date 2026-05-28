import express from 'express';
import auth from '../middleware/auth.js';
import {
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrderStatus
} from '../controllers/orders.controllers.js';

const router = express.Router();

router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrderById);
router.post('/', auth, createOrder);
router.put('/:id', auth, updateOrderStatus);

export default router;