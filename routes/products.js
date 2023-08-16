const express = require ('express')
const router = express.Router()
const Product= require('../models/product')
const db = require('../db')
const xss = require('xss')
const handleAddCart = require('../controllers/cartController')

// Product Search
router.get('/', async (req, res) =>{
   let searchOptions = {}
   let products
   if (req.query.Title != null && req.query.Title !== ""  ){
     searchOptions.Title = new RegExp(xss(req.query.Title), 'i')
    }
try{
    if (req.query.Title == null || req.query.Title === "" ){
    products = await db.executeQuery('SELECT * FROM products WHERE `Image Position` = \'1\'')
    }
    else{
    products = await Product.getProductsByTitle(req.query.Title)
    }
    products = Product.processProducts(products)
    res.render('products/index', {products: products, searchOptions: req.query})
} catch (err) {
    console.error(err)
    res.redirect('/')
} 
})

router.get('/:handle', async (req, res) =>{
   let variant = req.query.variant
   let handle = req.params.handle
    try {
    let products = await Product.getProductsByHandle(handle)
    const product = await Product.getProductByHandleAndVariant( handle , variant);
    if (!product){
         variant = '1'
    }
    products = Product.processProducts(products)
    
    res.render('products/show', { products: products,variant: variant})
   } catch (err) {
    console.error(err)
   }
    
})

router.post('/:handle', handleAddCart);

module.exports = router