import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  // 1. Check for token in Cookies FIRST, then the Authorization header
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // 2. Verify using your secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // 3. Attach the decoded user payload to the request object
    req.user = decoded;
    next();
  } catch (err) {
    // If token is expired or fake, clear the cookie so the frontend knows to logout
    res.clearCookie("token"); 
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;