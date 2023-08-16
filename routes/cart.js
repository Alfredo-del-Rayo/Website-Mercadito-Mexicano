const express = require('express')
const router = express()
const Cart = require('../models/cart')
const Product = require('../models/product')
const HandleRemoveItem = require('../controllers/cartRemoveController')
const User = require('../models/user')

router.get('/', async (req, res) =>{
    let products;
    try {
        username = req.cookies.username;
        let user = await User.getUserbyUsername(username);
        products = await Cart.getAllItems(username);
        products = await Product.processProducts(products);
        for(const product of products){
            if (product['Variant Inventory Qty'] < 1 ){
                await Cart.removeItem(user.id, product.id);
            }
        }
        products = await Cart.getAllItems(username);
        products = await Product.processProducts(products);
        for(const product of products){
            product.Title = await Product.getTitleFromHandle(product.Handle);
        }
        res.render('products/cart',{products, username})
        
    } catch (error) {
        products = []
        res.render('products/cart',{products})
    }
})

router.delete('/:product_id', HandleRemoveItem)

module.exports = router