var blackListDb = require('../db/black_list');
var jwtHelper = require('../tools/jwt_helper');
var statuses = require('../tools/http_status');

//Check token if expired, valid etc.
//Generate new token based on refresh-token if access-token is expired
exports.checkToken = function (accessToken, refreshToken) {
    return new Promise((resolve, reject) => {
        blackListDb.isBlacklisted(accessToken)
            .then(data => {
                if (data) {
                    let err = {
                        status: statuses.UNAUTHORIZED,
                        message: 'Invalid token'
                    };
                    reject(err);
                } else {
                    jwtHelper.checkToken(accessToken)
                        .then(decoded => {
                            let tokens = {
                                accessToken: accessToken,
                                refreshToken: refreshToken
                            };
                            resolve(tokens);
                            return;
                        })
                        .catch(err => {
                            let refreshUserData = jwtHelper.getRefreshTokenData(refreshToken).data;
                            console.log(refreshUserData);
                            if (refreshUserData) {
                                let newAccessToken = jwtHelper.getToken(refreshUserData);
                                let newRefreshToken = jwtHelper.getRefreshToken(refreshUserData);
                                let tokens = {
                                    accessToken: newAccessToken,
                                    refreshToken: newRefreshToken
                                };
                                resolve(tokens);
                            } else {
                                let error = {
                                    status: statuses.UNAUTHORIZED,
                                    message: 'Invalid refresh token'
                                };
                                reject(error);
                            }
                        });
                }
            }).catch(err => {
                let error = {
                    status: statuses.INTERNAL_SERVER_ERROR,
                    message: err
                };
                reject(error);
            })
    });
}