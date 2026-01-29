const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { isAdmin } = require('../middleware/authMiddleware'); 

// --- PUBLIC ROUTES
router.get('/', bookController.getAllBooks);       // GET /api/books
router.get('/:id', bookController.getBookById);    // GET /api/books/:id

// --- ADMIN ROUTES 
router.post('/', isAdmin, bookController.createBook);       // POST /api/books
router.put('/:id', isAdmin, bookController.updateBook);     // PUT /api/books/:id
router.delete('/:id', isAdmin, bookController.deleteBook);  // DELETE /api/books/:id

module.exports = router;