var express = require('express');
var router = express.Router();
var userLogin = require('../../controller/user/login.js');

/* GET home page. */
router.post('/', async function (req, res, next) {

  await userLogin(req, res);
  
});

module.exports = router;
