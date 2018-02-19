toDoApp.factory('CreateService', ['$q', 'BaseService',
    function ($q, BaseService) {
        var extended = Object.create(BaseService);
        return {
            //Create task
            create: function (task) {
                let deferred = $q.defer();
                extended.post('api/task', null, task)
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