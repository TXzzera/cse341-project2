const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const {isAuthenticated} = require('../middlewares/auth');

router.get('/', 
    //#swagger.tags = ['Users']
    usersController.getAll);
router.get('/:id',
    //#swagger.tags = ['Users']
    usersController.getSingle);
router.post('/', 
    //#swagger.tags = ['Users']
    isAuthenticated, usersController.userCreate);
router.put('/:id', 
    //#swagger.tags = ['Users']
    isAuthenticated, usersController.userUpdate);
router.delete('/:id', 
    //#swagger.tags = ['Users']
    isAuthenticated, usersController.userDelete);

module.exports = router;