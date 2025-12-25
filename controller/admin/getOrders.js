var express = require('express');
var router = express.Router();
var getOrders = require('../../controller/admin/getOrders.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function (req, res, next) {

  await getOrders(req, res);
  
});

module.exports = router;
