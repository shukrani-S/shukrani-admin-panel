const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files (images, css, etc) from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for homepage
app.get('/', (req, res) => {
  res.render('index'); // this will load views/index.ejs
});

// Start server
app.listen(port, () => {
  console.log(`✅ SHUKRANI-MD PANEL is running at http://localhost:${port}`);
});
