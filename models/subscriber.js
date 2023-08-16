const db = require('../db')

Subscriber ={};

Subscriber.new = async (email) => {
  try {
    const query = 'INSERT INTO subscribers (email) VALUES (?)';
    const result = await db.executeQuery(query, [email]);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

module.exports = Subscriber;