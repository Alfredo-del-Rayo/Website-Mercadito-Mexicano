const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Cart = require('../models/cart');
require('dotenv').config();

const setUserLocals = async (req, res, next) => {
  try{
  const username = req.cookies.username
  res.locals.username = username;
  if (username != null){
  const user = await User.getUserbyUsername(username);
  if (user != null){
    const number = await Cart.getItemNumber(user.id);
    res.locals.itemNumber = number;
  }
  else{
    res.locals.itemNumber = 0;
  }
  } 
  else{
  res.locals.itemNumber = 0;
  }
  next();
} catch(error){
    console.error(error)
    res.locals.itemNumber = 0;
    next();
  }
};

module.exports = setUserLocals;