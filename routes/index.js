const express =  require ('express');
const router = express.Router();
<<<<<<< HEAD
router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello World']
=======

router.get('/', (req, res) => {
>>>>>>> b20e15aeaccdf4af451f8443150f44783547048e
    res.send('Hello World!');
});

router.use('/users', require('./users'));

module.exports = router;

