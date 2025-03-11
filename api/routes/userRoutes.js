const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const userControllers = require('../controllers/userControllers');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', verifyToken, verifyAdmin, userControllers.getAllUsers);
// Route to handle signup
router.post('/', userControllers.createUser);

router.delete('/:id', verifyToken, verifyAdmin, userControllers.deleteUser);
router.get('/admin/:email', verifyToken, userControllers.getAdmin);
router.patch('/admin/:id', verifyToken, verifyAdmin, userControllers.makeAdmin);

module.exports = router;
