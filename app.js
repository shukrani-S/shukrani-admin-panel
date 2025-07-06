const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const adminRoutes = require('./routes/admin');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'shukranisecret',
  resave: false,
  saveUninitialized: true
}));

app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Admin Panel running at http://localhost:${PORT}/admin`);
});
