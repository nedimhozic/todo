toDoApp.service('BaseService', ['$http', '$q',
    function ($http, $q) {
        //Base service for creating request on the server
        var rootEndpoint = 'http://localhost:3000/';
        function makeRequest(method, url, params, data, headers) {
            let newHeaders = [];
            if (headers) {
                newHeaders = headers;
            } else {
                if (localStorage.getItem('nhtodo_access')) {
                    newHeaders['access-token'] = localStorage.getItem('nhtodo_access');
                    newHeaders['refresh-token'] = localStorage.getItem('nhtodo_refresh');
                }
            }
            var deferred = $q.defer();
            $http({
                method: method,
                url: url,
                params: params,
                data: data,
                headers: newHeaders,
                cache: false
            })
                .then(function makeRequestSuccess(resp) {
                    if (resp.headers()['access-token']) {
                        localStorage.setItem('nhtodo_access', resp.headers()['access-token'])
                    }
                    if (resp.headers()['refresh-token']) {
                        localStorage.setItem('nhtodo_refresh', resp.headers()['refresh-token'])
                    }
                    deferred.resolve(resp.data);
                }, function makeRequestFailed(resp) {
                    let error = {
                        status: resp.status,
                        message: resp.status == 500 ? 'Something goes wrong' : resp.data
                    }
                    deferred.reject(error);
                });
            return deferred.promise;
        }
        return {
            get: function (endpoint, params, headers, cache) {
                return makeRequest('GET', rootEndpoint + endpoint, params, null, headers);
            },
            post: function (endpoint, params, data, headers, cache) {
                return makeRequest('POST', rootEndpoint + endpoint, params, data, headers);
            },
        };
    },
]);