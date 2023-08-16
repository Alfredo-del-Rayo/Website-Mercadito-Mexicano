const db = require('../db')
const User = require('./user')
const Cart = {};

Cart.addItem = async(product_id, username) => {
    try{
        const user = await User.getUserbyUsername(username);
        const query = 'INSERT INTO cart (user_id, product_id) VALUES (?, ?)';
        await db.executeQuery(query, [user.id, product_id]);
        return;
    }catch (error){
        if (error.sqlState === '45000'){
            console.log('error 45000')
            return 45000;
        }
        if (error.sqlState == '23000'){
            console.log('error 23000')
            console.log(error.sqlState)
            return 23000;
        }
        else {
            console.error(error)
        return 1;
        }
    }
}

Cart.getAllItems = async(username) => {
    try{
        const user = await User.getUserbyUsername(username);
        const query = "SELECT p.* FROM products p JOIN cart c ON p.id = c.product_id WHERE c.user_id = ? ";
        const products = db.executeQuery(query, [user.id]);
        return products;

    }catch (error){
        throw error;
    }

}

Cart.removeItem = async(user_id, product_id) =>{
    try {
        const user = await User.getUserbyUsername(username);
        query = "DELETE FROM cart WHERE user_id= ? AND product_id = ?"
        await db.executeQuery(query, [user_id, product_id])
        return;
    } catch (error) {
        throw error;
    }

}

Cart.getItemNumber = async(user_id) =>{
    try {
        query = "SELECT COUNT(*) AS number FROM cart WHERE user_id = ?"
        let number = await db.executeQuery(query, [user_id]);
        return number[0].number;
    } catch (error) {
        throw error;
    }
}

module.exports = Cart