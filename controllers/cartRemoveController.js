const db = require('../db');
const User = require('../models/user');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');


const handleRemoveItem = async (req, res) =>{
    try{
        const product_id = req.params.product_id;
        const username = req.cookies.username;
        const user = await User.getUserbyUsername(username);
        await Cart.removeItem(user.id, product_id)
        res.redirect('/cart');
        }
     catch (error){
        console.error(error);
        }
}

module.exports = handleRemoveItem