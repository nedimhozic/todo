toDoApp.factory('ListService', ['$q', 'BaseService',
    function ($q, BaseService) {
        var extended = Object.create(BaseService);

        return {
            //get all tasks
            getAll: function () {
                let deferred = $q.defer();
                extended.get('api/task')
                    .then(data => {
                        deferred.resolve(data);
                    }).catch(error => {
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            //logout user
            logout: function () {
                let deferred = $q.defer();
                return extended.get('api/user/logout')
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