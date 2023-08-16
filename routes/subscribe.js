if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const emailPassword = process.env.EMAIL_APP_PASSWORD
const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const Product = require('../models/product')
const Subscriber = require('../models/subscriber')
const db = require('../db')

router.post('/', async (req, res) =>{
    try{
    const { email} = req.body
    const subscriber = await Subscriber.new(email)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'mercadito.updates@gmail.com',
            pass: emailPassword
        }
    })

    const mailOptions = {
        from: 'mercadito.updates@gmail.com',
        to: 'alexeidelrayo@gmail.com',
        subject:'New Subscriber!',
        text: `You have one more email subscriber: ${email}`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.error(err)
            res.status(500).send('Error sending Email')
        } else{
            console.log('Email sent: ' + info.response)
        }
    })
    const clientMailOptions = {
        from: 'mercadito.updates@gmail.com',
        to: `${email}`,
        subject:'Mercadito Mexicano Newsletter',
        html: '<p>Congratulations! You are now subscribed to the official Mercadito Mexicano Newsletter.</p><img width="100%" src="cid:media@nodemailer.com" alt="my bad">',
        attachments: [
            {
              filename: 'media.png', // Name of the attached image file
              path: './public/slideshowImages/media.png', // Path to the image file on your local machine
              cid: 'media@nodemailer.com', // Content ID for referencing the image in the HTML content
            },
          ]
    }
    transporter.sendMail(clientMailOptions, (err, info) => {
        if (err){
            console.error(err)
            res.status(500).send('Error sending Email')
        } else{
            console.log('Email sent: ' + info.response)
        }
    })
    
    let productResults = await db.executeQuery(
        'SELECT * FROM products WHERE `Image Position` = 1 ORDER BY RAND() LIMIT 10'
      )
    
    let collections = await db.executeQuery(
        'SELECT * FROM collections ORDER BY RAND() LIMIT 6'
    )
     let products = await Product.processProducts(productResults)

        res.render('index',{products: products, collections:collections, subscriptionMessage: 'You have successfully registered', scrollToBottomView: true})
    } catch {
        
        try{
            let productResults = await db.executeQuery(
                'SELECT * FROM products WHERE `Image Position` = \'1\' ORDER BY RAND() LIMIT 10'
              )
            
            let collections = await db.executeQuery(
                'SELECT * FROM collections ORDER BY RAND() LIMIT 6'
            )
             let products = await Product.processProducts(productResults)

            res.render('index',{collections: collections, products: products, subscriptionMessage: 'This email is already a subscriber. Please use another email!', scrollToBottomView: true})
        }
        catch{
            res.render('about',{subscriptionMessage: 'This email is already a subscriber. Please use another email!', scrollToBottomView: true})  
        }
 
    }
})

module.exports = router
