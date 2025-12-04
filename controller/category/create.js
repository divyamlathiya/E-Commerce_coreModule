var express = require('express');
var router = express.Router();
var response = require('../../utilities/responseManager.js');
var categoryRegister = require('../../models/category.model.js');

/* GET home page. */
async function createCategory(req, res, next) {

    const { categoryName } = req.body;

    if (categoryName) {
        const existingCategory = await categoryRegister.findOne({ categoryName });
        if (!existingCategory) {
            const newCategory = new categoryRegister({
                categoryName: categoryName
            });

            const saveCategory = await newCategory.save();
            response.onSuccess(res, saveCategory, 'Category registered successfully');
        } else {
            response.onError(res, `Category exists with ${categoryName} name`);
        }
    } else {
        response.onError(res, 'CategoryName field is required');
    }
  
};

module.exports = createCategory;
