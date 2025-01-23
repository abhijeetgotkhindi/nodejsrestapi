// controllers/userController.js
const User = require('../models/user');

const bcrypt = require('bcrypt');

exports.getAllUsers = function(req, res) {
    User.getAllUsers((err, users) => {
        if (err) 
            res.json({ message: err.message});
        else
        res.json(users);
    });
};

exports.getUserById = function(req, res) {
    User.getUserById(req.params.oid, (err, user) => {
        if (err) 
            res.json({ message: err.message});
        else
            res.json(user);
    });
};

exports.createUser = async function(req, res) {
    const newUser = req.body;
        updatedUser['password'] = await bcrypt.hash(newUser['password'] , 10);
    User.createUser(newUser, (err, result) => {
        if (err) 
            res.json({ message: err.message});
        else
            res.json({ message: 'User created successfully'});
    });
};

exports.updateUser = async function(req, res) {
    const updatedUser = req.body;
    if(updatedUser.hasOwnProperty('password')){
            updatedUser['password'] = await bcrypt.hash(updatedUser['password'] , 10);
    }
    await User.updateUser(req.params.oid, updatedUser, (err, result) => {
        if (err) 
            res.json({ message: err.message});
        else
            res.json({ message: 'User updated successfully' });
    });
};

exports.deleteUser = function(req, res) {
    User.deleteUser(req.params.oid, (err, result) => {
        if (err) 
            res.json({ message: err.message});
        else
            res.json({ message: 'User deleted successfully' });
    });
};
