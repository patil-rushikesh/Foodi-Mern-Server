const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartControllers')



router.get('/',cartController.getCardByEmail)
router.post('/', cartController.addToCart)
router.delete('/:id', cartController.deleteCart)
router.put('/:id',cartController.updateCart)
router.get('/:id',cartController.getSingleCart)


module.exports = router;