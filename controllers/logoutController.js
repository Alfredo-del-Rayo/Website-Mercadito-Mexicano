const User = require('../models/user')
require('dotenv').config


const handleLogout = async (req, res) =>{ 
    try{
    console.log("logging out")
    refreshToken = req.cookies.refreshToken;
    const user = await User.getUserbyRefreshToken(refreshToken);
    await User.updateRefreshToken(user.id, ' ')
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('accessToken', { httpOnly: true, sameSite: 'None', secure: true });
    res.clearCookie('username', { httpOnly: true, sameSite: 'None', secure: true });
    res.locals.username = null;
    res.redirect('/')
    } catch(err){
        console.error(err)
    }
 }


module.exports = handleLogout