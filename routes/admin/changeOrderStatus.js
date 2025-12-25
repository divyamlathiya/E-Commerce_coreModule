var express = require('express');
var router = express.Router();
var changeOrderStatus = require('../../controller/admin/changeOrderStatus.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function (req, res, next) {

  await changeOrderStatus(req, res);
  
});

module.exports = router;
