// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routers/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static images
app.use('/assets/images/image', express.static(path.join(__dirname, '../public/assets/images/image')));
app.use('/assets/images/music', express.static(path.join(__dirname, '../public/assets/images/music')));

app.use('/', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
