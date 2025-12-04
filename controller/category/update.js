var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var categoryRegister = require('../../models/category.model.js');

/* GET users listing. */
async function updatedCategory(req, res, next) {
  
  const categoryData = await categoryRegister.findOne({ categoryName: 'Toys' }).lean();

  if (categoryData) {
    const updateCategory = await categoryRegister.findOneAndUpdate({ categoryName: 'Toys' }, { $set: {categoryName: 'toys'} }).lean();
    if (updateCategory) {
      response.onSuccess(res, updateCategory, 'Record updated');
    } else {
      response.onError(res, 'Record not updated');
    }
  } else {
    response.onError(res, 'No data found');
  }

};

module.exports = updatedCategory;
