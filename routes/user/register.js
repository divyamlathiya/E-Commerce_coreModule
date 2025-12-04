var express = require('express');
var router = express.Router();
var registerUser = require('../../controller/user/register.js');

/* GET home page. */
router.post('/', async function(req, res, next) {

  await registerUser(req, res);
  
});

module.exports = router;
