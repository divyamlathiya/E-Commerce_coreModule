var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var categoryRegister = require('../../models/category.model.js');

/* GET users listing. */
async function deleteProduct(req, res, next) {

  const { categoryName } = req.body;
  
  const categoryData = await categoryRegister.findOne({ categoryName }).lean();

  if (categoryName) {
    if (categoryData) {
      const deleteCategory = await categoryRegister.findOneAndDelete({ categoryName }).lean();
      if (deleteCategory) {
        response.onSuccess(res, deleteCategory, 'category is deleted');
      } else {
        response.onError(res, 'Record not deleted'); 
      }
    } else {
      response.onError(res, 'No data found');
    }
  } else {
    response.onError(res, 'CategoryName is required');
  }

};

module.exports = deleteProduct;
