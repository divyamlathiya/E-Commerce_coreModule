var express = require('express');
var router = express.Router();
var deleteUser = require('../../controller/user/deleteUser.js');
const auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', auth, async function (req, res, next) {

  await deleteUser(req, res);
  
});

module.exports = router;
