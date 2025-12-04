var express = require('express');
var router = express.Router();
var updatedCategory = require('../../controller/category/update.js');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  
  await updatedCategory(req, res);

});

module.exports = router;
