var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var categoryRegister = require('../../models/category.model.js');

/* GET users listing. */
async function deleteProduct(req, res, next) {
  
  const categoryData = await categoryRegister.findOne({ categoryName: 'Home&Kitchen' }).lean();

  if (categoryData) {
    const deleteCategory = await categoryRegister.findOneAndDelete({ categoryName: 'Home&Kitchen' }).lean();
    if (deleteCategory) {
      response.onSuccess(res, deleteCategory, 'category is deleted');
    } else {
      response.onError(res, 'Record not deleted'); 
    }
  } else {
    response.onError(res, 'No data found');
  }

};

module.exports = deleteProduct;
