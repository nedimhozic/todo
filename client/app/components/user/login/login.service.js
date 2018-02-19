toDoApp.factory('LoginService', ['$q', 'BaseService',
    function ($q, BaseService) {
        var extended = Object.create(BaseService);
        return {
            //Create request for login user
            login: function (email, password) {
                let deferred = $q.defer();
                let headers = {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                extended.post('api/user/login', null, 'email=' + email + '&password=' + password, headers)
                    .then(data => {
                        deferred.resolve(data);
                    })
                    .catch(error => {
                        throw new Error(JSON.stringify(error));
                    });
                return deferred.promise;
            },
            //Create request for signin/validate user
            signIn: function (token) {
                let deferred = $q.defer();
                let headers = {
                    'Registration-Token': token
                }
                return extended.get('api/user/signin', null, headers)
                    .then(data => {
                        deferred.resolve(data);
                    })
                    .catch(error => {
                        throw new Error(JSON.stringify(error));
                    });
                return deferred.promise;
            }
        }
    },
]);