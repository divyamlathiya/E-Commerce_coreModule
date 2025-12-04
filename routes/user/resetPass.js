var express = require('express');
var router = express.Router();
var resetPass = require('../../controller/user/forgetPassword/resetPass.js');

/* GET home page. */
router.post('/', async function (req, res, next) {

  await resetPass(req, res);
  
});

module.exports = router;
