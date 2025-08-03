// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
  // ✅ Simulate a logged-in user
  req.user = { id: 'demo-user-id' };
  next();
};

module.exports = authMiddleware;
