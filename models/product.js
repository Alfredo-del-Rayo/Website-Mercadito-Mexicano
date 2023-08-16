const db = require('../db'); 

const Product = {};


// Retrieve all products
Product.getAllProducts = async () => {
  try {
    const query = 'SELECT * FROM products where `Image Position` = \'1\''; 
    const products = await db.executeQuery(query);
    return products;
  } catch (error) {
    throw error;
  }
};

Product.findProducts = async (searchOptions) =>{
  try {
    const productQuery = 'SELECT * FROM products WHERE CONCAT(LOWER(Title), " ", Handle) REGEXP ? AND `Image Position` = \'1\'';
    const products = await db.executeQuery(productQuery, [searchOptions]);
    return products;
  } catch (error) {
    throw error;
  }
}

Product.processProducts = (productResults) =>{
  try{
   return productResults.map((product) => ({
       id: product.id,
       Handle: product.Handle,
       Title: product.Title,
       'Body (HTML)': product['Body (HTML)'],
       'Option1 Value': product['Option1 Value'],
       'Variant Inventory Qty': product['Variant Inventory Qty'],
       'Image Position': product['Image Position'],
       'Image Src': product['Image Src'],
       'Variant Price': parseFloat(product['Variant Price']),
       'Variant Image': product['Variant Image']
     }));
   } catch(error){
     throw error;
   }
 }

// Retrieve products based on search options
Product.getProductsByTitle = async (title) => {
  try {
    const query = 'SELECT * FROM products WHERE (CONCAT(LOWER(Title), Handle) Like ?) AND `Image Position` = \'1\'';
    const titlePattern = `%${title.toString().toLowerCase()}%`; 
    const products = await db.executeQuery(query, [titlePattern]);
    return products;
  } catch (error) {
    throw error;
  }
};

Product.getProductsByHandle = async (handle) => {
  try {
    const query = 'SELECT * FROM Products WHERE Handle = ?';
    const products = await db.executeQuery(query, [handle]);
    return products;
  } catch (error) {
    throw error;
  }
};

Product.getProductsById = async (id) => {
  try {
    const query = 'SELECT * FROM Products WHERE id = ?';
    const products = await db.executeQuery(query, [id]);
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
};

Product.removeProduct = async (id) => {
  try {
    const query = 'UPDATE Products SET `Variant Inventory Qty` = 0 WHERE id = ?';
    await db.executeQuery(query, [id]);
    return;
  } catch (error) {
    console.error(error);
    return null;
  }

}

Product.getTitleFromHandle = async (handle) => {
  try {
    const query = 'SELECT * FROM Products WHERE Handle = ? AND `Image Position` = \'1\'';
    const product = await db.executeQuery(query, [handle]);
    return product[0].Title;
  } catch (error) {
    throw error;
  }
};

// Get a product by handle and variant
Product.getProductByHandleAndVariant = async (handle, variant) => {
  try {
    const query = 'SELECT * FROM Products WHERE Handle = ? AND BINARY `Image Position` = ?';
    const product = await db.executeQuery(query, [handle, variant]);
    return product[0]; // Assuming there's only one matching product
  } catch (error) {
    throw error;
  }
};


// Update an existing product
Product.updateProduct = async (productId, productData) => {
  try {
    const query = 'UPDATE Products SET Handle = ?, Title = ?, `Body (HTML)` = ?, `Option1 Value` = ?, `Variant Inventory Qty` = ?, `Variant Price` = ?, `Variant Image` = ?, `Image Src` = ?, `Image Position` = ? WHERE id = ?';
    const values = [
      productData.Handle,
      productData.Title,
      productData['Body (HTML)'],
      productData['Option1 Value'],
      productData['Variant Inventory Qty'],
      productData['Variant Price'],
      productData['Variant Image'],
      productData['Image Src'],
      productData['Image Position'],
      productId,
    ];
    const result = await db.executeQuery(query, values);
    return result.affectedRows > 0; // Returns true if the update was successful
  } catch (error) {
    throw error;
  }
};



module.exports = Product;