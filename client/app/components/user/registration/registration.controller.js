toDoApp.controller('RegistrationController', ['$scope', 'RegistrationService',
    function ($scope, RegistrationService) {
        $scope.submitted = false;
        //Submit registration and make request
        $scope.submitRegistration = function () {
            $scope.submitted = true;
            if ($scope.registrationForm.$invalid) {
                return;
            }
            let registrationData = {
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            }
            //Make request to the service for register
            RegistrationService.register(registrationData)
                .then(data => {
                    document.querySelector('.toastr .content').innerHTML = 'User registered. Wait for email to validate';
                    document.querySelector('.toastr').style.display = 'initial';
                    setTimeout(function () {
                        document.querySelector('.toastr').style.display = 'none';
                    }, 10000);
                    $scope.firstName = '';
                    $scope.lastName= '';
                    $scope.email = '';
                    $scope.password = '';
                    $scope.confirmPassword = '';
                    $scope.submitted;
                }).catch(error => {
                    console.log(error);
                })
        }
    }
]);