import express from 'express';

import auth from '../middleware/auth.js';

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser
} from '../controllers/users.controllers.js';

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.get('/profile', auth, getProfile);

router.put('/profile', auth, updateProfile);

export default router;