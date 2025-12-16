var express = require('express');
var router = express.Router();
var createProduct = require('../../controller/product/create.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET users listing. */
router.post('/', isAdmin, async function (req, res, next) {
  
  await createProduct(req, res);

});

module.exports = router;
