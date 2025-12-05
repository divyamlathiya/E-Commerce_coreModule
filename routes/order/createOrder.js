var express = require('express');
var router = express.Router();
var createOrder = require('../../controller/order/createOrder.js');
var auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', auth, async function (req, res, next) {

  await createOrder(req, res);
  
});

module.exports = router;
