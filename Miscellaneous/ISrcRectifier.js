if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const Product = require('../models/product');

(async () => {
  try {
    let x = 1;
    const products = await Product.find().exec();
    for (const product of products) {
      console.log(product['Image Src']);
    }
  } catch (err) {
    console.error(err);
  }
})();