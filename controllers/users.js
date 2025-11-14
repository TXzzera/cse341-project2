const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) =>{
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users)=>{
        res.setHeader('Content-Type','application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req,res) =>{
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({_id:userId});
    result.toArray().then((users)=>{
        res.setHeader('Content-Type','application/json');
        res.status(200).json(users[0]);
    });
};

/* In these 3 new functions below, I didn't accessed the database directly. It abilitates the reuse 
of the functions in other parts of the application, if needed in the future.*/

const userCreate = async (req,res) =>{
    //#swagger.tags = ['Users']
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const result = await mongodb.insertOne('users', newUser);
        res.status(201).json({
            message: 'User created successfully',
            insertedId: result.insertedId,
            data: newUser
        });
    } catch (err) {
        res.status(500).json({message: 'Creating a user failed!'
        });
    }
}

const userUpdate = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);
    const updatedUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    try {
        const query = {_id: userId};
        const updateData = {$set: updatedUser};
        const result = await mongodb.updateOne('users', query, updateData);

        if (result.modifiedCount > 0) {
        res.status(200).json({
            message: 'User updated successfully',
            data: updatedUser
        });
    } else {
        res.status(404).json({message: 'User not found!'});
    } } catch (err) {
        res.status(500).json({message: 'Updating user failed!'});
}};

const userDelete = async (req, res) => {
    //#swagger.tags = ['Users']
    const userId = new ObjectId(req.params.id);

    try {
        const query = {_id: userId};
        const result = await mongodb.deleteOne('users', query);
        if (result.deletedCount > 0) {
            res.status(200).json({message: 'User deleted successfully'});
        } else {
            res.status(404).json({message: 'User not found!'});
        } } catch (err) {
        res.status(500).json({message: 'Deleting user failed!'});
}};


module.exports = {
    getAll,
    getSingle,
    userCreate,
    userUpdate,
    userDelete
};