var express = require('express');
var router = express.Router();
var readProduct = require('../../controller/product/read.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.get('/', isAdmin, async function(req, res, next) {

  await readProduct(req, res);

});

module.exports = router;
