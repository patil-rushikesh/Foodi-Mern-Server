// Importing required packages
const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const connectDB = require('./api/controllers/connectDB');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Configuration
const mongoURI = process.env.MONGO_URI;

connectDB(mongoURI);


// JWT Authentication Endpoint
app.post('/jwt', (req, res) => {
    try {
        const user = req.body;
        if (!user) return res.status(400).send({ message: "User data is required" });

        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error("❌ JWT Generation Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Import and Use Routes
const menuRoutes = require('./api/routes/menuRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const userRoutes = require('./api/routes/userRoutes');

app.use('/menu', menuRoutes);
app.use('/carts', cartRoutes);
app.use('/users', userRoutes);

// Base Endpoint
app.get('/', (req, res) => {
    res.send("Welcome to the Food Delivery API");
});

// Start the Server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});