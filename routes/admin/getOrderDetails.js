var express = require('express');
var router = express.Router();
var getOrderDetails = require('../../controller/admin/getOrderDetails.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function (req, res, next) {

  await getOrderDetails(req, res);
  
});

module.exports = router;
