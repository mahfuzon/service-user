const express = require('express');
const router = express.Router();
const refresh_token_handler = require('./handler/refresh_token');

router.post('/', refresh_token_handler.create);
router.get('/', refresh_token_handler.get);
module.exports = router;
