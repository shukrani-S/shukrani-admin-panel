const db = require('../database/db');

async function updateSetting(key, value) {
  try {
    await db.query(
      `INSERT INTO settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
      [key, value]
    );
    console.log(`✅ ${key} updated to ${value}`);
    return true;
  } catch (err) {
    console.error('❌ Error updating setting:', err);
    return false;
  }
}

async function getSetting(key) {
  try {
    const res = await db.query(`SELECT value FROM settings WHERE key = $1`, [key]);
    return res.rows[0]?.value || 'no';
  } catch (err) {
    console.error('❌ Error getting setting:', err);
    return 'no';
  }
}

module.exports = {
  updateSetting,
  getSetting
};
