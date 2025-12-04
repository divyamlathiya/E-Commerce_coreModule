var express = require('express');
var router = express.Router();
var createProduct = require('../../controller/product/create.js');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  
  await createProduct(req, res);

});

module.exports = router;
