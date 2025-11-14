const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
router.post('/', usersController.userCreate);
router.put('/:id', usersController.userUpdate);
router.delete('/:id', usersController.userDelete);

module.exports = router;