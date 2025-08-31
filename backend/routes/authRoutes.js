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

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', auth, getMe);
router.put('/me', auth, updateMe);

module.exports = router;
