var dbClient = require('../tools/db_client');
var mongoose = require('mongoose');

// database connect
var db = dbClient.getDBConection();

// Create a Mongoose schema for User object
var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

// Register the schema
var User = mongoose.model('User', UserSchema, 'User');

//Save user
exports.saveUser = function (userData) {
    var user = new User(userData);
    return new Promise(function (resolve, reject) {
        user.save()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Get user by email
exports.getUserByEmail = function (email) {
    return new Promise(function (resolve, reject) {
        let query = { email: email };
        User.findOne(query).exec()
            .then(user => {
                resolve(user);
            })
            .catch(err => {
                reject(err);
            })
    })
}

//Populate 'tasks' array within user
exports.populateWithTasks = function (userId, taskId) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndUpdate(
            userId,
            { $push: { "tasks": taskId } },
            { safe: true, upsert: true },
            function (err, user) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(user);
            });
    })
}

exports.User = User;