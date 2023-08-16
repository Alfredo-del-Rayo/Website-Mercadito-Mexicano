const db = require('../db')
const User = require('../models/user')
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) =>{
    try{
        const{username, password} = req.body
        const existingUser = await User.authentication(username, password);
        params ={ }
        if(!existingUser){
            params.errorMessage = 'Invalid Credentials'
            res.render("account/login", params)
        }
        else{
            const user = await User.getUserbyUsername(username);
            const accessToken = jwt.sign({"username": user.username },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
            )
            const refreshToken = jwt.sign({"username": user.username },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
            )
            await User.updateRefreshToken(user.id, refreshToken)
            res.cookie('refreshToken', refreshToken, {httpOnly: true,sameSite: 'None', secure: true, maxAge: 24000 * 3600})
            res.cookie('accessToken', accessToken, {httpOnly: true,sameSite: 'None', secure: true, maxAge: 15 * 60 * 1000})
            res.cookie('username',user.username, {httpOnly: true,sameSite: 'None', secure: true, maxAge: 24000 * 3600})
            console.log(req.cookies.username)
            res.redirect('/')
        }
    } catch (error){
        console.error(error);
        res.render("account/login", params)
        }
}

module.exports = handleLogin