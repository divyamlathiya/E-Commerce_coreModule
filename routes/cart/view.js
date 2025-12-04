var express = require('express');
var router = express.Router();
var viewCart = require('../../controller/cart/view.js');
var auth = require('../../middleware/auth.js');

/* GET home page. */
router.get('/', auth, async function(req, res, next) {

  await viewCart(req, res);

});

module.exports = router;
