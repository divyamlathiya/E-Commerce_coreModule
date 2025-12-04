var express = require('express');
var router = express.Router();
var deleteProduct = require('../../controller/product/delete.js');

/* GET home page. */
router.get('/', async function(req, res, next) {

  await deleteProduct(req, res);

});

module.exports = router;
