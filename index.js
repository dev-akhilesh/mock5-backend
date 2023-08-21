// index.js

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');

dotenv.config();


app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);

app.get('/', (req, res) => {
    res.send('Homepage');
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});