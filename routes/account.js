const express = require('express')
const router = express.Router()
const db = require('../db')
const User = require('../models/user')
const Handlelogin = require('../controllers/authController') 
const HandleRegister = require('../controllers/registerController')
const handleLogout = require('../controllers/logoutController')



router.get('/login', (req, res) =>{
    res.render('account/login')
})
router.get('/register', (req, res) =>{
    res.render('account/register')
})

router.get('/logout', handleLogout)

router.post('/', HandleRegister)

router.post('/login', Handlelogin)

module.exports = router
