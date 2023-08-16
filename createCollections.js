if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

const Collection = require('./models/collection.js')
    try {
        const collectionData = {
            name: 'Rebozos and Zarapes',
            contains: 'rebozo zarape',
            notcontains: '',
            image: 'rebozos.png'
        };

        const collections = Collection.find({name:'Guayaberas'});
        for(let i =0; i < collections.length; i++){
           const collection = collections[i]
        collection.image = 'guayaberas.png'
        collection.save();
        console.log('collection saved');
        }
        
    } catch (err) {
        console.error(err);
    }




