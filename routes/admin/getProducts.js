var express = require('express');
var router = express.Router();
var getProducts = require('../../controller/admin/getProducts.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function (req, res, next) {

  await getProducts(req, res);
  
});

module.exports = router;
