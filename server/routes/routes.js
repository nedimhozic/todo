var auth = require('./auth');
var users = require('./users');
var tasks = require('./tasks');

//Register routes
exports.assignRoutes = function (app) {
    app.all('/*', auth.checkCorsHeaders);

    //User related routes
    app.post('/api/user/register', users.register);
    app.post('/api/user/login', users.login);
    app.get('/api/user/signin', users.signin);
    app.get('/api/user/logout', users.logout);

    app.all('/*', auth.checkAuthHeaders);
        
    //Task related routes
    app.post('/api/task', tasks.saveTask);
    app.get('/api/task', tasks.getAllTasks);
}