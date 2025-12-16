var express = require('express');
var router = express.Router();
var readCategory = require('../../controller/category/read.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET users listing. */
router.get('/', isAdmin, async function (req, res, next) {
  
  await readCategory(req, res);

});

module.exports = router;
