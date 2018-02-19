var tasksDb = require('../db/tasks');
var jwtHelper = require('../tools/jwt_helper');
var statuses = require('../tools/http_status');

//Save task
exports.saveTask = function (taskData, token) {
    return new Promise(function (resolve, reject) {
        if (!taskData.title ||
            !taskData.description) {
            let error = {
                status: statuses.BAD_REQUEST,
                message: 'Missing fields'
            }
            reject(error);
            return;
        }

        let userData = jwtHelper.getData(token).data;
        taskData.userId = userData._id;
        tasksDb.saveTask(taskData)
            .then(data => {
                resolve(data);
            }).catch(err => {
                let error = {
                    status: statuses.INTERNAL_SERVER_ERROR,
                    message: err
                };
                reject(error);
            })
    });
}

//Get all tasks for user
exports.getAllTasks = function (token) {
    return new Promise(function (resolve, reject) {
        let userData = jwtHelper.getData(token).data;
        tasksDb.getAllTasks(userData._id)
            .then(data => {
                resolve(data);
            }).catch(err => {
                let error = {
                    status: statuses.INTERNAL_SERVER_ERROR,
                    message: err
                };
                reject(error);
            })
    });
}