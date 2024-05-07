const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const verifyJWT =require("../middleware/verifyJWT")

router.use(verifyJWT);
router.get('/', userController.getUsers);
router.post('/createuser', userController.createUser);

router.put('/update/:id', userController.updateUser);
router.get('/getuser/:id', userController.getUser);
router.delete('/deleteuser/:id', userController.supprimerUser);
module.exports = router;