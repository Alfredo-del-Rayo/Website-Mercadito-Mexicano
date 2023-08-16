const db = require('../db');
const Product = require('../models/product');
const Cart = require('../models/cart');
const jwt = require('jsonwebtoken');


const handleAddCart = async (req, res) =>{
    try{
        let number
        const product_id = req.body.itemId;
        const username = req.cookies.username;
        
        if(username == null || username === ''){
        number = 2;
        } else{
        number = await Cart.addItem(product_id, username)
        }
        console.log('item added to cart');
        let variant = req.query.variant
        let handle = req.params.handle
        let products = await Product.getProductsByHandle(handle)
        const product = await Product.getProductByHandleAndVariant( handle , variant);
        if (!product){
            variant = '1'
       }
       products = await Product.processProducts(products)

       for (let i = 0; i < products.length; i++) {
        
        const title = await Product.getTitleFromHandle(products[i].Handle);
        products[i].Title = title;
      }
  
      if (number == null){
       res.locals.itemNumber += 1;
       res.render('products/show', { products: products,variant: variant, addedItem:true})
      }
      else{
       res.render('products/show', { products: products,variant: variant, errorNumber:number})
      }
        
        }
     catch (error){
        console.error(error);
        }
}

module.exports = handleAddCart
