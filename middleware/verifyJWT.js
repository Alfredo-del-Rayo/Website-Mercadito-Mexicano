const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');


const verifyJWT = (req, res, next) => {
const accessToken = req.cookies.accessToken; 
    if (!accessToken) return refreshToken(req, res, next);
    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return refreshToken(req, res, next);
        req.user = decoded.username;
        next();
    })
}

     //Requesting a new access token if it is expired
     const refreshToken = async (req, res, next) => {
        try{
        const refreshToken = req.cookies.refreshToken;
        const user = await User.getUserbyRefreshToken(refreshToken); 
        if (!refreshToken) res.render('products/cart', {products: [], notLogged: true});
       
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user.username != decoded.username){
                return res.render('products/cart', {notLogged: true})}
            req.user = decoded.username;
            const accessToken = jwt.sign({ username: req.user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
            res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000});
            next();
           
          });   
        } catch (error){
            console.error(error);
            res.redirect('/');
        }   
    }


module.exports = verifyJWT