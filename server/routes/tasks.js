var tasksDomain = require('../domain/tasks');

//api/task POST - get all tasks
exports.saveTask = function (req, res, next) {
    var token = res.getHeader('access-token');
    var task = req.body;
    tasksDomain.saveTask(task, token)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
}

//api/task GET - get all tasks
exports.getAllTasks = function (req, res, next) {
    var token = res.getHeader('access-token');
    tasksDomain.getAllTasks(token)
        .then(data => {
            console.log('taskovi:' + data.length)
            res.json(data)
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
}



