var express = require('express');
var userControllers=require('../controllers/users.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',userControllers.login);
router.post('/register',userControllers.register);
router.get('/verify',userControllers.verify);
router.get('/logout',userControllers.logout);
router.get('/getUser',userControllers.getUser);
router.post('/findPassword',userControllers.findPassword);

module.exports = router;
