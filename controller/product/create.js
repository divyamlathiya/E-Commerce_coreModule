var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var productRegister = require('../../models/product.model.js');
var categoryRegister = require('../../models/category.model.js');

/* GET users listing. */
async function createProduct(req, res, next) {
  const { name, category, price, inStoke } = req.body;

  if (name.trim()) {
    const existingName = await productRegister.findOne({ name });
    if (!existingName) {
      if (category) {
        const existingCategory = await categoryRegister.findOne({ categoryName: category });
        
        if (!existingCategory) {
          response.onError(res, 'This category is not acceptable');
        } else {
        if (price && price > 0) {
          if (inStoke && (inStoke === true || inStoke === false || inStoke === 'true' || inStoke === 'false')) {
              const newProduct = new productRegister({
                name: name,
                category: category,
                price: price,
                inStoke: inStoke
              });
  
              const saveProduct = await newProduct.save();
              response.onSuccess(res, saveProduct, 'Product added successfully');
          } else {
            response.onError(res, 'InStoke field is required and must be true or false');
          }
        } else {
          response.onError(res, 'Price field is required and must be valid number');
        }
      }
      } else {
        response.onError(res, 'Category field is required');
      }
    } else {
      response.onError(res, `Product is exist with ${name} name`)
    }
  } else {
    response.onError(res, 'Name field is required');
  }
};

module.exports = createProduct;
