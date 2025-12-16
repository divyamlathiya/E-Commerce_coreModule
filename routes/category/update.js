var express = require('express');
var router = express.Router();
var updatedCategory = require('../../controller/category/update.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET users listing. */
router.get('/', isAdmin, async function (req, res, next) {
  
  await updatedCategory(req, res);

});

module.exports = router;
