const User = require('../models/user')
require('dotenv').config


const handleRegister = async (req, res) =>{
    let params
     try{
     const{username, email, password} = req.body
     const existingUser = await User.findUser(username, email);
     params ={
         username: username,
         password: password,
     }
     console.log(existingUser.length)
     if(existingUser.length > 0){
         params.errorMessage = 'User already Exists try changing the username or email'
         res.render("account/register", params)
     }
     else{
     await User.createUser(username, email, password);
     res.redirect('/account/login')
     }
     } catch (error){
         console.error(error);
         params.errorMessage = 'User already Exists try changing the username or email'
         res.render("account/register", params)
     }
 
 }
module.exports = handleRegister 