const express = require('express');
const { register, login, getMe, updateMe, debugAdmins } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Log route registration
console.log('🔗 Registering auth routes...');
console.log('📝 Available controllers:', { register: !!register, login: !!login, getMe: !!getMe, updateMe: !!updateMe, debugAdmins: !!debugAdmins });

// Debug routes (remove in production)
router.get('/debug/admins', debugAdmins);

// Test route to check if auth routes are working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Auth routes are working',
    timestamp: new Date().toISOString()
  });
});

// Test PUT route to verify PUT method works
router.put('/test-put', (req, res) => {
  console.log('✅ PUT /test-put route hit');
  res.json({
    success: true,
    message: 'PUT route is working',
    timestamp: new Date().toISOString(),
    body: req.body
  });
});

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/me', (req, res, next) => {
  console.log('🔄 PUT /me route hit - about to call auth middleware');
  next();
}, auth, (req, res, next) => {
  console.log('🔄 PUT /me auth passed - about to call updateMe controller');
  next();
}, updateMe);

module.exports = router;
