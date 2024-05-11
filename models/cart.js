const fs = require("fs");
const path = require("path");
const Product = require("./product");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class cart {
  static addProduct(id, productPrice) {
    //fetch previous cart
    fs.readFile(p, (err, filecontent) => {
      let cart = { Products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(filecontent);
      }
      //analyse the cart
      const existingProductIndex = cart.Products.findIndex(
        (prod) => prod.id == id
      );
      const existingProduct = cart.Products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.Products = { ...cart.Products };
        cart.Products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.Products = [...cart.Products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
