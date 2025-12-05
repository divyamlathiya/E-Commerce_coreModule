var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var productRegister = require('../../models/product.model.js');

/* GET home page. */
async function deleteProduct(req, res, next) {

  const { productName } = req.body;

  const productData = await productRegister.findOne({ name: productName }).lean();

  if (productName) {
    if (productData) {
      const deleteProductData = await productRegister.findOneAndDelete({ name: productName }).lean();
  
      if (deleteProductData) {
        return response.onSuccess(res, productData, 'Record deleted successfully');
      } else {
        return response.onError(res, 'Record not delered');
      }
    } else {
      return response.onError(res, 'No data found');
    }
  } else {
    response.onError(res, 'ProductName field is required');
  }
};

module.exports = deleteProduct;
