const express = require('express');
const qrcode = require('qrcode');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', __dirname + '/views');

app.get('/', async (req, res) => {
  const userCode = req.query.code;
  if (!userCode) return res.render('index', { qrImage: null, pairCode: null });

  const qrData = `https://wa.me/qr/${userCode}`;
  const qrImage = await qrcode.toDataURL(qrData);
  res.render('index', { qrImage, pairCode: userCode });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ SHUKRANI Pair site running on port ${PORT}`);
});
