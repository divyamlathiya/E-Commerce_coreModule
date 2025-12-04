var express = require('express');
var router = express.Router();
var readProduct = require('../../controller/product/read.js');

/* GET home page. */
router.get('/',async function(req, res, next) {

  await readProduct(req, res);

});

module.exports = router;
