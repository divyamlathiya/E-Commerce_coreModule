var express = require('express');
var router = express.Router();
var adminLogin = require('../../controller/admin/adminLogin.js');

/* GET home page. */
router.post('/', async function (req, res, next) {

  await adminLogin(req, res);
  
});

module.exports = router;
