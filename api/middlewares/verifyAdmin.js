require('dotenv').config();
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    try {
        const email = req.decoded.email;
        const user = await User.findOne({ email });
        if (!user || user.role !== "admin") {
            return res.status(403).send({ message: "Forbidden Access" });
        }
        next();
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};

module.exports = verifyAdmin;
