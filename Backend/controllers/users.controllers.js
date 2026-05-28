import User from '../models/user.models.js';
import jwt from 'jsonwebtoken';

// Register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: 'Email already exists'
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        success: true,
        message: "Registration successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });

  } catch (err) {

    console.log(err);

    res.status(400).json({
      message: err.message
    });
  }
};

// Login
export const loginUser = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({
        success: true,
        message: `Welcome back, ${user.name}`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        }
      });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
};

// Get Profile
export const getProfile = async (req, res) => {

  try {

    const user = await User
      .findById(req.user.id)
      .select('-password');

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });
  }
};

// Update Profile
export const updateProfile = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select('-password');

    res.json(user);

  } catch (err) {

    console.log(err);

    res.status(400).json({
      message: err.message
    });
  }
};

// Logout
export const logoutUser = async (req, res) => {

  res
    .clearCookie("token")
    .status(200)
    .json({
      success: true,
      message: "Logged out"
    });
};