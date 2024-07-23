const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/homepage', controller.homePage);
router.get('/getAll', controller.getAllUsers);
router.get('/getOne/:id', controller.getOneUser);
router.post('/update/:id', controller.updateUsers);
router.post('/create', controller.createUsers);
router.delete('/delete/:id', controller.deleteUsers);

module.exports = router;
