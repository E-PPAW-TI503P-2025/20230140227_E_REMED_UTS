const express = require('express');
const app = express();
const port = 3000;
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Library Geolocation API is Running... 🚀');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});