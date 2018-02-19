var usersDomain = require('../domain/users');

//api/user/register POST - register
exports.register = function (req, res, next) {
    var userData = req.body;
    usersDomain.register(userData)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
}

//api/user/login POST - login
exports.login = function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    usersDomain.login(email, password)
        .then(data => {
            res.setHeader('Access-Token', data.accessToken);
            res.setHeader('Refresh-Token', data.refreshToken);
            res.json({
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName
            });
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        })
}

//api/user/signin GET - first time login with validation token
exports.signin = function (req, res, next) {
    var token = req.headers['Registration-Token'] || req.headers['registration-token'];
    usersDomain.signIn(token)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
}

//api/user/logout GET - logout user
exports.logout = function (req, res, next) {
    let accessToken = req.headers['Access-Token'] || req.headers['access-token'];
    let refreshToken = req.headers['Refresh-Token'] || req.headers['refresh-token'];
    usersDomain.logout(accessToken, refreshToken)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
}