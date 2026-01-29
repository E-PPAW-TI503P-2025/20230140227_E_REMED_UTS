const { Book, BorrowLog } = require('../models');
const Joi = require('joi');

module.exports = {
  borrowBook: async (req, res) => {
    // 1. validasi input
    const schema = Joi.object({
      bookId: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const { bookId, latitude, longitude } = req.body;
      const userId = req.userId; 

        // 2. Cek ketersediaan buku
      const book = await Book.findByPk(bookId);
      if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
      if (book.stock < 1) return res.status(400).json({ message: 'Stok buku habis!' });

      // 3. Kurangi Stok Buku
      await book.update({ stock: book.stock - 1 });

      // 4. Catat Log Peminjaman beserta Lokasi
      const log = await BorrowLog.create({
        userId,
        bookId,
        borrowDate: new Date(),
        latitude,
        longitude
      });

      res.status(201).json({ 
        message: 'Peminjaman berhasil dicatat', 
        data: log 
      });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};