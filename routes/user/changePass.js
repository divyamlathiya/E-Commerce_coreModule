var express = require('express');
var router = express.Router();
var changePassword = require('../../controller/user/changePass.js');
const auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', auth, async function (req, res, next) {

  await changePassword(req, res);
  
});

module.exports = router;
