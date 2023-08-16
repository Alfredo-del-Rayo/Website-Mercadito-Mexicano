const fs = require('fs');
const axios = require('axios');
const csv = require('csv-parser');

const csvFilePath = 'products_export.csv';
const downloadPath = 'public/images/';
// Read the CSV file
fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const imageSrc = row['Image Src']; // Replace with the actual column name from your CSV
    const fileNameWithQuery = imageSrc.substring(imageSrc.lastIndexOf('/') + 1);
    const fileName = fileNameWithQuery.split('?')[0];
    const imagePath = `${downloadPath}${fileName}`; // Define the target path for saving the image
    console.log(`${downloadPath}${fileName}`)
    console.log(' Break Here ')
    console.log(fileName)
    console.log(' Break Here ')
    axios
      .get(imageSrc, { responseType: 'stream' })
      .then((response) => {
        response.data.pipe(fs.createWriteStream(imagePath));
      })
      .catch((error) => {
        console.error(`Failed to download image: ${imageSrc}`);
        console.error(error);
      });
  })
  .on('end', () => {
    console.log('Image download completed!');
  });