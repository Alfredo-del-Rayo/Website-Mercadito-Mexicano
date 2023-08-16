if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const fs = require('fs');
const db = require ('./db')
const Product = require('./models/product.js');
let x=1;
let y=0;
(async () => {
    try {
        let products =  await Product.getAllProducts();
        products = await db.executeQuery('SELECT * FROM products');
       for (const product of products){
        const path = `./public/images/${product['Image Src']}`
        fs.access(path, fs.constants.F_OK, (err) => {
            if (err) {
                y += 1;
              console.error(`File does not exist. Error: ${y} on ${product.Handle} where ${path}`);
            } 
          });
       }
    } catch (error) {
        throw error;
    }
})();