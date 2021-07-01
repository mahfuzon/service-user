const express = require('express');
const router = express.Router();
const userHandler = require('./handler/user');



router.post('/register' , userHandler.register);
router.post('/login', userHandler.login);
router.post('/logout', userHandler.logout);
router.put('/:id', userHandler.update);
router.get('/', userHandler.getAll);
router.get('/:id', userHandler.getUser);

module.exports = router;
