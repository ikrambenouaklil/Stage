const express = require('express');
const router = express.Router();
const userController = require('../controller/AuthController');

router.post('/login', userController.login);
router.get('/refresh', userController.Refresh);
module.exports = router;
