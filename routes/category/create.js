var express = require('express');
var router = express.Router();
var createCategory = require('../../controller/category/create.js');
var { isAdmin } = require('../../middleware/isAdmin.js');

/* GET users listing. */
router.post('/', isAdmin, async function (req, res, next) {
  
  await createCategory(req, res);

});

module.exports = router;
