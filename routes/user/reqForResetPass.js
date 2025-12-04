var express = require('express');
var router = express.Router();
var reqForResetPass = require('../../controller/user/forgetPassword/reqForResetPass.js');

/* GET home page. */
router.post('/', async function (req, res, next) {

  await reqForResetPass(req, res);
  
});

module.exports = router;
