var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var categoryRegister = require('../../models/category.model.js');

/* GET users listing. */
async function readCategries(req, res, next) {
  
  const categoryData = await categoryRegister.find({  });

  if (categoryData.length > 0) {
    response.onSuccess(res, categoryData, 'Data fatched');
  } else {
    response.onError(res, 'Data not found');
  }

};

module.exports = readCategries;

