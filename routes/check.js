const express = require('express')
const router = express.Router()
const db = require('../db')
const User = require('../models/user')


// Route to handle the username availability check
router.get('/username', async (req, res) => {
  const { value } = req.query;
  try{
  const users =  await User.getAllUsers();
  const existingUsernames = users.map(user => user.username);
  const isUsernameAvailable = !existingUsernames.includes(value);

  // Respond with the availability status as JSON
  res.json({ available: isUsernameAvailable });
  
} catch (error){
    throw error;
  }
});

// Route to handle the email availability check
router.get('/email', async (req, res) => {
    const { value } = req.query;
    try{
    const users = await User.getAllUsers();
    existingEmails = users.map((user) => (user.email))
    const isUsernameAvailable = !existingEmails.includes(value);
  
    // Respond with the availability status as JSON
    res.json({ available: isUsernameAvailable });
    
  } catch (error){
      throw error;
    }
  });

module.exports = router;






