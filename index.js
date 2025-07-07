const express = require('express');
const path = require('path');
const qrcode = require('qrcode');
const { startSock, getQR, getPairCode } = require('./connect');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Start the WhatsApp bot
startSock();

// Home panel
app.get('/', (req, res) => {
  res.render('index');
});

// Live QR page
app.get('/qr', async (req, res) => {
  const qr = getQR();
  if (!qr) return res.send("⏳ QR haijapatikana bado. Jaribu tena baada ya sekunde chache.");
  
  const qrImage = await qrcode.toDataURL(qr);
  res.render('qr', { qrImage });
});

// Live Pair Code page
app.get('/pair', (req, res) => {
  const pairCode = getPairCode();
  if (!pairCode) return res.send("⏳ Pair code haijapatikana bado.");
  
  res.render('pair', { pairCode });
});

app.listen(port, () => {
  console.log(`✅ SHUKRANI-MD PANEL running at http://localhost:${port}`);
});
