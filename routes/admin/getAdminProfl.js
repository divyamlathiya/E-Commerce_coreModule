var express = require('express');
var router = express.Router();
var getAdminProfl = require('../../controller/admin/getAdminProfl.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function (req, res, next) {

  await getAdminProfl(req, res);
  
});

module.exports = router;
