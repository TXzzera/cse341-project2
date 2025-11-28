const express = require('express');
const router = express.Router();

const carsController = require('../controllers/cars');

const {isAuthenticated} = require('../middlewares/auth');

router.get('/', 
    //#swagger.tags = ['Cars']
    carsController.getAll);
router.get('/:id', 
    //#swagger.tags = ['Cars']
    carsController.getSingle);
router.post('/', 
    //#swagger.tags = ['Cars']
    isAuthenticated, carsController.carCreate);
router.put('/:id', 
    //#swagger.tags = ['Cars']
    isAuthenticated, carsController.carUpdate);
router.delete('/:id', 
    //#swagger.tags = ['Cars']
    isAuthenticated,carsController.carDelete);

module.exports = router;