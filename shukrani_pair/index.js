const express = require('express');
const qrcode = require('qrcode');
const app = express();

const PAIR_CODE = 'SHUKRANI-PAIR-CODE'; // Badilisha hapa ikiwa dynamic

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const qrData = `https://wa.me/qr/${PAIR_CODE}`;
  const qrImage = await qrcode.toDataURL(qrData);
  res.render('index', { qrImage, pairCode: PAIR_CODE });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ SHUKRANI Pair site running on port ${PORT}`);
});
