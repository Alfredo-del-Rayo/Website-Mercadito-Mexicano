if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

const fs = require('fs');
const axios = require('axios');
const csv = require('csv-parser');
const Product = require('./models/product')

const csvFilePath = 'products.csv';
// Read the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', async (row) => {
    const varImg = row['Variant Image']; 
    const varHandle = row['Handle'];
    const varName = row['Option1 Value'];
    if (varName != null && varName != ''){
    try{
        const product = await Product.find({$and: [{Handle: varHandle, 'Option1 Value': varName }]})
        const fileNameWithQuery = varImg.substring(varImg.lastIndexOf('/') + 1);
        const fileName = fileNameWithQuery.split('?')[0];
        console.log(`Handle: ${varHandle}`)
        console.log(`varName: ${varName}`)
        console.log(`This is the name of the Product ${product['Option1 Value']}`)
        console.log(`This is the variant image ${fileName}`)
        product['Variant Image'] = fileName
        await product.save()
        }catch(err){
        console.error(err)
        }
    }
  })
  .on('end', () => {
    console.log('Image download completed!');
  });