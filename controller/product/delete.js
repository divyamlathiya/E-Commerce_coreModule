var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var productRegister = require('../../models/product.model.js');

/* GET home page. */
async function deleteProduct(req, res, next) {

  const productData = await productRegister.findOne({ name: "Computer" }).lean();

  if (productData) {
    const deleteProductData = await productRegister.findOneAndDelete({ name: "Computer" }).lean();

    if (deleteProductData) {
      return response.onSuccess(res, productData, 'Record deleted successfully');
    } else {
      return response.onError(res, 'Record not delered');
    }
  } else {
    return response.onError(res, 'No data found');
  }
};

module.exports = deleteProduct;
