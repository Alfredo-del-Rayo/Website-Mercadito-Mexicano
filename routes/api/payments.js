const express = require('express')
const router = express.Router()
const Product = require('../../models/product')
const Cart = require('../../models/cart')
const paymentController = require('../../controllers/paymentController')

router.get('/confirmation', (req, res) => {
    console.log(req.body);
    var orderId = req.query.orderId;
    var receiptNumber = req.query.receiptNumber;
    console.log(orderId);
    console.log(receiptNumber);
    res.render('payments/confirmation', { orderId, receiptNumber });
})
router.get('/cart/:user', async (req, res) =>{
    let username =req.params.user;
    try {
        let products = await Cart.getAllItems(username);
        products = await Product.processProducts(products);
        for(const product of products){
            product.Title = await Product.getTitleFromHandle(product.Handle);
        }
        res.render('payments/cardpayment', {layout: false, products: products})

    } catch (error) {
        console.error(error);
    }
})
router.get('/:id', async (req, res) =>{
    let id =req.params.id;
    try {
        let products = await Product.getProductsById(id);
        products = await  Product.processProducts(products);
        for(const product of products){
            product.Title = await Product.getTitleFromHandle(product.Handle);
        }
        let product = products[0];
        if(product != null && product['Variant Inventory Qty'] > 0 && product['Variant Price'] > 0){
        res.render('payments/cardpayment', {layout: false, products: products})
        }
    } catch (error) {
        console.error(error);
    }
})

router.post('/createPayment',paymentController.createPayment)
router.post('/storeCard', paymentController.storeCard)

router.post('/checkQty', async (req, res) =>{
    const products = req.body;
    console.log(JSON.stringify(products))
try{
    for (const product of products){
        let id = parseInt(product)
        let updatedProducts = await Product.getProductsById(id);
        updatedProducts = await Product.processProducts(updatedProducts);
        let updatedProduct = updatedProducts[0];
        console.log(updatedProduct['Handle']);
        console.log(updatedProduct['Variant Inventory Qty']);

        if (updatedProduct['Variant Inventory Qty'] < 1){
            console.log('no product');
            res.status(200).json(false);
            return;
        }
    }
    console.log('it works')
    res.status(200).json(true)
} catch (err){
    throw err;
}
})






module.exports = router;