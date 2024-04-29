const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getUsers);
router.put('/update/:id', userController.updateUser);
router.get('/getuser/:id', userController.getUser);
router.delete('/deleteuser/:id', userController.supprimerUser);
module.exports = router;