const { Book } = require('../models');
const Joi = require('joi');

module.exports = {
  // 1. lihat buku semua (Public)
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.findAll();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // 2. lihat detail buku (Public)
  getBookById: async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });
      res.json(book);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // 3. tambah buku (Admin Only)
  createBook: async (req, res) => {
    // Validasi Input pakai Joi
    const schema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      stock: Joi.number().integer().min(0).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const book = await Book.create(req.body);
      res.status(201).json({ message: 'Buku berhasil ditambahkan', data: book });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // 4. update buku (Admin Only)
  updateBook: async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

      await book.update(req.body);
      res.json({ message: 'Buku berhasil diupdate', data: book });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  // 5. hapus buku (Admin Only)
  deleteBook: async (req, res) => {
    try {
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ message: 'Buku tidak ditemukan' });

      await book.destroy();
      res.json({ message: 'Buku berhasil dihapus' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};