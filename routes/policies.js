const express = require('express')
const router = express.Router()

router.get('/terms-of-service', (req, res) =>{
    res.render('pages/terms')
})

router.get('/refund-policy', (req, res) =>{
    res.render('pages/refund')
})

router.get('/shipping-policy', (req, res) =>{
    res.render('pages/shipping')
})

module.exports = router