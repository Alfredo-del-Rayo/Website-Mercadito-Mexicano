const db = require('../db')
const bcrypt = require('bcrypt')

const User ={}

User.getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM users'
    const users = await db.executeQuery(query);
    return users
  } catch (error) {
    throw error;
  }
}

User.findUser = async (username, email) =>{
  try {
    query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    const users = db.executeQuery(query, [username, email]);
    return users;
  } catch (error) {
    throw error;
  }
}

User.getUserbyUsername = async(username) => {
  try {
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    const users = await db.executeQuery(query, [username, username]);
    return users[0];
  } catch (error) {
    return null;
  }
}

User.authentication = async(username, password) => {
  try {
    let matches = false;
    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    const users = await db.executeQuery(query, [username, username]);
    const user = users[0];
    if(users.length == 1){
      return comparePasswords(password, user.password)
  } else{
    return matches;
  }

  } catch (error) {
    return false;
  }
}


User.createUser = async (username, email, password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, hashedPassword];
    
    await db.executeQuery(query, values);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

async function comparePasswords(password, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

User.getUserbyRefreshToken = async (refreshToken) =>{
  try{
    const query = "SELECT * FROM users WHERE refresh_token = ?";
    const match = await db.executeQuery(query, [refreshToken]);
    return match[0];
  } catch(error){
    console.error(error)
    return null;
  }
}

User.updateRefreshToken = async(id, refreshToken) =>{
  try{
    query = 'UPDATE users SET refresh_token = ? WHERE id = ? '
    await db.executeQuery(query, [ refreshToken, id]);

  } catch (error){
    throw error;
  }
}

  
module.exports = User