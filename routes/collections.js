const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Collection = require('../models/collection')

router.get('/', async (req, res) => {
    try{
       const collections = await Collection.getAll()
        res.render('collections/index', {collections: collections})
    }
    catch(err){
        console.error(err)
    }
})

router.get('/all', async (req, res) => {
    try{
        let products = await Product.getAllProducts()
        products = Product.processProducts(products)
        res.render('collections/all', {products})
     }
     catch(err){
         console.error(err)
     }
})

router.get('/:name', async (req, res) => {
    try{
        const name = req.params.name
        const collection = await Collection.getCollectionbyName(name)
        const contains = collection.contains.split(' ');
        const regexPattern = contains.map(word => `${word}`).join("|")
        let products = await Product.findProducts(regexPattern)
        products = Product.processProducts(products)
        res.render('collections/show', { products, collection})

    } catch(err){
        console.error(err)
    }

})

router.get('/products/:Handle', (req, res) =>{
    const handle = req.params.Handle;
    res.redirect(`/products/${handle}`);
})

module.exports = router