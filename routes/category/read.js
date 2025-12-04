var express = require('express');
var router = express.Router();
var readCategory = require('../../controller/category/read.js');

/* GET users listing. */
router.get('/', async function (req, res, next) {
  
  await readCategory(req, res);

});

module.exports = router;
