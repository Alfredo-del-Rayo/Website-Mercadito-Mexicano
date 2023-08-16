const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const emailPassword = process.env.EMAIL_APP_PASSWORD

router.get('/about', (req, res) =>{
    res.render('pages/about')
})

router.get('/the-rise', (req, res) =>{
    res.render('pages/rise')
})

router.get('/terms-of-service', (req, res) =>{
    res.render('pages/terms')
})

router.get('/refund-policy', (req, res) =>{
    res.render('pages/refund')
})

router.get('/shipping-policy', (req, res) =>{
    res.render('pages/shipping')
})

router.get('/ethnic-groups', (req, res) =>{
    res.render('pages/ethnicGroups')
})

router.get('/oaxaca', (req, res) =>{
    res.render('pages/oaxaca')
})
router.get('/hidalgo', (req, res) =>{
    res.render('pages/hidalgo')
})
router.get('/chiapas', (req, res) =>{
    res.render('pages/chiapas')
})
router.get('/contact', (req, res) =>{
    res.render('pages/contact')
})
router.post('/contact',(req, res) => {
    const { name, email, phone, message} = req.body
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
        subject:'Someone is contacting you from the Mercadito Mexicano Website!',
        html: `<p> Name: ${name} </p><p> Email: ${email} </p><p> phone Number: ${phone} </p><p> Message: ${message} </p>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err){
            console.error(err)
            res.render('pages/contact', {errorMessage: "Error sending form. Make sure to fill all the fields!"})
        } else{
            console.log('Email sent: ' + info.response)
            res.render('pages/contact', {contactMessage: "Thanks for contacting us. We'll get back to you as soon as possible."})
        }
    })

})


module.exports = router