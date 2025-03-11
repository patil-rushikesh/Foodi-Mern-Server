const Carts = require('../models/Cart');

//get Cards Using Email
const getCardByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const result = await Carts.find({ email }).exec();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//post a cart when add-to-cart button clicked
const addToCart = async (req, res) => {
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        //existing menu item
        const existingCartItem = await Carts.findOne({ menuItemId });
        if (existingCartItem) {
            return res.status(400).json({ message: "Product Already exists in the cart" })
        }
        const cartItem = await Carts.create({
            menuItemId, name, recipe, image, price, quantity, email
        })
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete a cart Item
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    console.log(cartId)
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if (!deletedCart) {
            return res.status(401).json({ messsage: "Cart Item Deleteed Successully" })
        }
        res.status(200).json({ message: "Cart Item Deleted Successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update a cart item
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;
    try {
        const updatedCard = await Carts.findByIdAndUpdate(
            cartId, { menuItemId, name, recipe, image, price, quantity, email }, {
            new: true, runValidators: true
        }
        )
        if(!updatedCard){
            return res.status(400).json({message: "cart item not found"})
        }
        res.status(200).json(updatedCard)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
//get single recipe
const getSingleCart = async (req,res)=>{
    const cartId = req.params.id;
    try{
        const cartItem = await Carts.findById(cartId);
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getCardByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
};