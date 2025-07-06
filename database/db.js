const { Pool } = require('pg');

const pool = new Pool({
  user: 'shukrani_md_user',
  host: 'dpg-d1i2980dl3ps73b3m4mg-a.oregon-postgres.render.com',
  database: 'shukrani_md',
  password: 'weka_password_yako_hapa',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;
