const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const db = require('../db')

router.get('/', async (req, res) => {
    let productResults
    let collections
    let products
    try{
        productResults = await db.executeQuery(
            'SELECT * FROM products WHERE `Image Position` = \'1\' ORDER BY RAND() LIMIT 10'
          )
        
        collections = await db.executeQuery(
            'SELECT * FROM collections ORDER BY RAND() LIMIT 6'
        )

         products = await Product.processProducts(productResults)
        
    }catch(err){ 
        console.error(err)
        products = []
        collections = []

    }
    res.render('index', {products: products, collections: collections})
})

module.exports = router