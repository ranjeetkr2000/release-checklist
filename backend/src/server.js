require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./config/db');
const releaseRoutes = require('./routes/releaseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

initDB().catch(console.error);

app.use('/api/releases', releaseRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});