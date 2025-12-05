var express = require('express');
var router = express.Router();
var cancelOrder = require('../../controller/order/cancelOrder.js');
var auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', auth, async function (req, res, next) {

  await cancelOrder(req, res);
  
});

module.exports = router;
