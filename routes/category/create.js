var express = require('express');
var router = express.Router();
var createCategory = require('../../controller/category/create.js');

/* GET users listing. */
router.post('/', async function (req, res, next) {
  
  await createCategory(req, res);

});

module.exports = router;
