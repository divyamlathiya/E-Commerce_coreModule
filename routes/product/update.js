var express = require('express');
var router = express.Router();
var updatedProduct = require('../../controller/product/update.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.get('/', isAdmin, async function(req, res, next) {

  await updatedProduct(req, res);

});

module.exports = router;
