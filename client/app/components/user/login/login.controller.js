toDoApp.controller('LoginController', ['$scope', '$location', '$routeParams', 'LoginService',
    function ($scope, $location, $routeParams, LoginService) {
        $scope.submitted = false;
        //Make request to the service for login user
        $scope.submitLogin = function () {
            $scope.submitted = true;
            if ($scope.loginForm.$invalid) {
                return;
            }
            LoginService.login($scope.email, $scope.password).then(data => {
                localStorage.setItem('nhtodo_user', JSON.stringify(data));
                $location.path("/");
            }).catch(error => {
                console.log(error);
            })
        };

        //Check if in URL is token, sign in user
        if ($routeParams.token) {
            LoginService.signIn($routeParams.token).then((data) => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
        }
    }
]);