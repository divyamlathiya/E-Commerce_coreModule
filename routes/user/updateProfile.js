var express = require('express');
var router = express.Router();
var updateProfile = require('../../controller/user/updateProfile.js');
var auth = require('../../middleware/auth.js');

/* GET home page. */
router.post('/', auth, async function (req, res, next) {

  await updateProfile(req, res);
  
});

module.exports = router;
