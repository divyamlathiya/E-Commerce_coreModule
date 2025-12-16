var express = require('express');
var router = express.Router();
var deleteCategory = require('../../controller/category/delete.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET users listing. */
router.post('/', isAdmin, async function (req, res, next) {
  
  await deleteCategory(req, res);

});

module.exports = router;
