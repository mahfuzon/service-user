const express = require('express');
const router = express.Router();
const userHandler = require('./handler/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register' , userHandler.register);
router.post('/login', userHandler.login);
router.put('/:id', userHandler.update);

module.exports = router;
