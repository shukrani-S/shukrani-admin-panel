const express = require('express');
const path = require('path');
const qrcode = require('qrcode');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Route: homepage panel
app.get('/', (req, res) => {
  res.render('index');
});

// Route: QR Code
app.get('/qr', async (req, res) => {
  const qrData = "wa://connect-your-whatsapp-session";
  const qrImage = await qrcode.toDataURL(qrData);
  res.render('qr', { qrImage });
});

// Route: Pair Code
app.get('/pair', (req, res) => {
  const pairCode = '123-456'; // Replace with real logic
  res.render('pair', { pairCode });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
