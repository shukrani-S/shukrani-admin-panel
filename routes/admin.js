const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

router.use((req, res, next) => {
  if (req.path === '/login' || req.session.loggedIn) return next();
  return res.redirect('/admin/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASS) {
    req.session.loggedIn = true;
    return res.redirect('/admin');
  }
  res.send('Wrong password');
});

router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM settings');
  res.render('dashboard', { settings: result.rows });
});

router.post('/toggle/:key', async (req, res) => {
  const key = req.params.key;
  const value = req.body.value === 'yes' ? 'yes' : 'no';
  await db.query('UPDATE settings SET value = $1 WHERE key = $2', [value, key]);
  res.redirect('/admin');
});

module.exports = router;
