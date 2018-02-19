toDoApp.factory('RegistrationService', ['$q', 'BaseService',
    function ($q, BaseService) {
        var extended = Object.create(BaseService);
        return {
            //Register user
            register: function (registrationData) {
                let deferred = $q.defer();
                extended.post('api/user/register', null, registrationData)
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