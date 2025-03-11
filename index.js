const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

// Middlewares
app.use(cors());
app.use(express.json());

//mongodb configuration
mongoose.connect(`mongodb://localhost:27017/`)
    .then(
        console.log("MongoDB connected Successfully")
    )
    .catch(
        (error) => console.log("Error Connecting to MongoDB", error)
    );

    // jwt authentication
    app.post('/jwt', async(req, res) =>{
        const user = req.body;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: `1hr`})
        res.send({token});
    })

    
    

//Import routes
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)

app.listen(port, () => console.log(`App listening on port ${port}!`))