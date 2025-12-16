var express = require('express');
var router = express.Router();
var deleteProduct = require('../../controller/product/delete.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function(req, res, next) {

  await deleteProduct(req, res);

});

module.exports = router;
