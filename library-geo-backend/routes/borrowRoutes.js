const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { isUser } = require('../middleware/authMiddleware');

// --- USER ROUTES 
router.post('/', isUser, borrowController.borrowBook); // POST /api/borrow

module.exports = router;
