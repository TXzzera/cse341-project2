const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags = ['Cars']
  try {
    const cars = await mongodb
      .getDatabase()
      .db()
      .collection('cars')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getSingle = async (req, res) => {
  //#swagger.tags = ['Cars']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Must use a valid car id to find a car.' });
    }

    const carId = new ObjectId(req.params.id);

    const car = await mongodb
      .getDatabase()
      .db()
      .collection('cars')
      .findOne({ _id: carId });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(car);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* In these 3 new functions below, I didn't accessed the database directly. It abilitates the reuse 
of the functions in other parts of the application, if needed in the future.*/

const carCreate = async (req,res) =>{
    //#swagger.tags = ['Cars']
    const newCar = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        transmission: req.body.transmission
    };

    try {
        const result = await mongodb.insertOne('cars', newCar);
        res.status(201).json({
            message: 'Car created successfully',
            insertedId: result.insertedId,
            data: newCar
        });
    } catch (err) {
        res.status(500).json({message: 'Creating a car failed! Internal Error.'
        });
    }
}

const carUpdate = async (req, res) => {
    //#swagger.tags = ['Cars']
    const carId = new ObjectId(req.params.id);
    const updatedCar = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        transmission: req.body.transmission
    };

    try {
        const query = {_id: carId};
        const updateData = {$set: updatedCar};
        const result = await mongodb.updateOne('cars', query, updateData);

        if (result.modifiedCount > 0) {
          res.status(200).json({
            message: 'Car updated successfully',
            data: updatedCar
        });
    } else {
        res.status(400).json({message: 'Car not found!'});
    } } catch (err) {
        res.status(500).json({message: 'Updating Car failed! Internal Error.'});
}};

const carDelete = async (req, res) => {
    //#swagger.tags = ['Cars']
    const CarId = new ObjectId(req.params.id);

    try {
        const query = {_id: CarId};
        const result = await mongodb.deleteOne('cars', query);
        if (result.deletedCount > 0) {
            res.status(200).json({message: 'Car deleted successfully'});
        } else {
            res.status(400).json({message: 'Car not found!'});
        } } catch (err) {
        res.status(500).json({message: 'Deleting Car failed!'});
}};


module.exports = {
    getAll,
    getSingle,
    carCreate,
    carUpdate,
    carDelete
};