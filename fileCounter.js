const fs = require('fs');

function countFilesInFolder(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${err}`);
      return;
    }
    
    const fileCount = files.length;
    console.log(`Number of files in folder '${folderPath}': ${fileCount}`);
  });
}

// Usage: Provide the folder path as a command line argument
const folderPath = 'images/';
countFilesInFolder(folderPath);