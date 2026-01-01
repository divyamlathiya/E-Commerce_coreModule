var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var productRegister = require('../../models/product.model.js');

/* GET home page. */
async function readProduct(req, res, next) {

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;


  // Sorting
  const sort = { price: -1 };


  // Filtering
  const filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }


  const totalItems = await productRegister.countDocuments();
  const items = await productRegister.find(filter).sort(sort).skip(skip).limit(limit).lean();

  const totalPages = Math.ceil(totalItems / limit);


  if (items.length > 0) {
    response.onSuccess(res, { currentPage: page, totalPages: totalPages, totalItems: totalItems, items: items, sort: sort, filter: filter }, 'Data fetched');
  } else {
    response.onSuccess(res, { currentPage: page, totalPages: totalPages, totalItems: totalItems, items: [], sort: sort, filter: filter }, 'No data fetched');
  }
};

module.exports = readProduct;
