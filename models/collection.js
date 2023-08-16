const db = require('../db'); 

const Collection = {};

Collection.getAll = async() =>{
    try {
        const query ='SELECT * FROM collections'
        const collections = await db.executeQuery(query)
        return collections;
    } catch (error) {
        throw error;
    }
}

Collection.getCollectionbyName = async(name) =>{
try {
    const query = 'SELECT * FROM collections WHERE name = ?';
    const collection = await db.executeQuery(query, [name]);
    return collection[0];
} catch (error) {
    throw error;
}
}

module.exports = Collection