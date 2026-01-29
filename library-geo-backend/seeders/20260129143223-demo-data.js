'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // 1. Masukkan Data User (1 Admin, 1 User Biasa)
    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin_perpus',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'budi_peminjam',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    // 2. Masukkan Data Buku
    await queryInterface.bulkInsert('Books', [
      {
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        stock: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Filosofi Teras',
        author: 'Henry Manampiring',
        stock: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Books', null, {});
  }
};