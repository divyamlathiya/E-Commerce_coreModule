var express = require('express');
var router = express.Router();
var removeProduct = require('../../controller/cart/remove.js');
var auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', auth, async function(req, res, next) {

  await removeProduct(req, res);

});

module.exports = router;
