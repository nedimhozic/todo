var dbClient = require('../tools/db_client');
var usersDb = require('./users');
var mongoose = require('mongoose');

// database connect
var db = dbClient.getDBConection();

// Create a Mongoose schema for Task object
var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Register the schema
var Task = mongoose.model('Task', TaskSchema, 'Task');

// Save task
exports.saveTask = function (taskData) {
    var task = new Task(taskData);
    return new Promise(function (resolve, reject) {
        task.save()
            .then(newTask => {
                usersDb.populateWithTasks(newTask.userId, newTask._id)
                    .then(data => {
                        resolve({ taskId: newTask._id });
                    })
                    .catch(err => {
                        reject(err);
                    });
            })
            .catch(err => {
                console.log(err);
                reject(err);
            })
    })
}

//Get all tasks for user
exports.getAllTasks = function (userId) {
    return new Promise(function (resolve, reject) {
        let query = { userId: userId };
        Task.find(query).exec()
            .then(tasks => {
                resolve(tasks);
            })
            .catch(err => {
                reject(err);
            })
    })
}

exports.Task = Task;