var express = require('express');
var router = express.Router();
var deleteCategory = require('../../controller/category/delete.js');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  
  await deleteCategory(req, res);

});

module.exports = router;

