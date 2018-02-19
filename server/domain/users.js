var usersDb = require('../db/users');
var blackListDb = require('../db/black_list');
var bcrypt = require('bcryptjs');
var jwtHelper = require('../tools/jwt_helper')
var statuses = require('../tools/http_status');
var mailer = require('../tools/mailer');

//Create token based on user data and send email
exports.register = function (userData) {
    return new Promise(function (resolve, reject) {
        if (!userData.firstName ||
            !userData.lastName ||
            !userData.email ||
            !userData.password) {
            let error = {
                status: statuses.BAD_REQUEST,
                message: 'Missing fields'
            }
            reject(error);
            return;
        }
        var salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);

        usersDb.getUserByEmail(userData.email)
            .then(user => {
                if (user) {
                    let error = {
                        status: statuses.CONFLICT,
                        message: 'User already exists',
                    }
                    reject(error);
                    return;
                }
                let token = jwtHelper.getToken(userData);
                mailer.sendEmail(userData.email, token).then(() => { }).catch(err => { });
                resolve(token);
            })
            .catch(err => {
                let error = {
                    status: statuses.INTERNAL_SERVER_ERROR,
                    message: err,
                }
                reject(error);
            });
    });
};

//First time login after registration
exports.signIn = function (token) {
    let userData = jwtHelper.getData(token).data;

    return new Promise((resolve, reject) => {
        jwtHelper.checkToken(token)
            .then(decoded => {
                let userData = decoded.data;
                if (userData) {
                    usersDb.saveUser(userData)
                        .then(createdUser => {
                            resolve('Success');
                        })
                        .catch(err => {
                            let error = {
                                status: statuses.INTERNAL_SERVER_ERROR,
                                message: err,
                            }
                            reject(error);
                        });
                } else {
                    let error = {
                        status: statuses.UNAUTHORIZED,
                        message: 'Invalid token'
                    };
                    reject(error);
                }
            }).catch(err => {
                let error = {
                    status: statuses.UNAUTHORIZED,
                    message: 'Token expired'
                };
                reject(error);
            })
    });
}

//Login user
exports.login = function (email, password) {
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            let error = {
                status: statuses.BAD_REQUEST,
                message: 'Bad data'
            };
            reject(error);
            return;
        }
        usersDb.getUserByEmail(email).then(userData => {
            if (userData) {
                let isMatch = bcrypt.compareSync(password, userData.password)
                if (!isMatch) {
                    let error = {
                        status: statuses.UNAUTHORIZED,
                        message: 'Invalid password'
                    };
                    reject(error);
                } else {
                    let accessToken = jwtHelper.getToken(userData);
                    let refreshToken = jwtHelper.getRefreshToken(userData);
                    let tokens = {
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        email: userData.email,
                        firstName: userData.firstName,
                        lastName: userData.lastName
                    }
                    resolve(tokens);
                }
            } else {
                let error = {
                    status: statuses.UNAUTHORIZED,
                    message: 'Invalid email'
                };
                reject(error);
            }
        }).catch(err => {
            let error = {
                status: statuses.INTERNAL_SERVER_ERROR,
                message: err,
            }
            reject(error);
        });
    });
}

//Logout user
exports.logout = function (accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        blackListDb.add(accessToken, refreshToken)
        then(data => {
            resolve();
        })
            .catch(err => {
                let error = {
                    status: statuses.INTERNAL_SERVER_ERROR,
                    message: err
                };
                reject(error);
            });
    });
}

