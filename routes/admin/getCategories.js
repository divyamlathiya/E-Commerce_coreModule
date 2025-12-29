var express = require('express');
var router = express.Router();
var getCategories = require('../../controller/admin/getCategories.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET home page. */
router.post('/', isAdmin, async function (req, res, next) {

  await getCategories(req, res);
  
});

module.exports = router;
