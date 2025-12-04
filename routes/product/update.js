var express = require('express');
var router = express.Router();
var updatedProduct = require('../../controller/product/update.js');

/* GET home page. */
router.get('/',async function(req, res, next) {

  await updatedProduct(req, res);

});

module.exports = router;
