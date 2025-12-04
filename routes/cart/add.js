var express = require('express');
var router = express.Router();
var addProduct = require('../../controller/cart/add.js');
var auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', async function (req, res) {

auth(req, res, async function() {
    await addProduct(req, res);
  });
});

module.exports = router;
