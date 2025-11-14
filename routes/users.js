const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);
<<<<<<< HEAD
router.post('/', usersController.userCreate);
router.put('/:id', usersController.userUpdate);
router.delete('/:id', usersController.userDelete);
=======
>>>>>>> b20e15aeaccdf4af451f8443150f44783547048e

module.exports = router;