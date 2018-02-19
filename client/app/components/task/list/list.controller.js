toDoApp.controller('ListController', ['$scope', '$location', '$routeParams', 'ListService',
    function ($scope, $location, $routeParams, ListService) {
        loadData();

        //Get current user and show the name in the header
        $scope.user = '';
        let user = JSON.parse(localStorage.getItem('nhtodo_user'));
        if (user) {
            $scope.user = user.lastName + ' ' + user.firstName;
        }

        //Event for reload task list
        $scope.$on('reload-list', function () {
            loadData();
        });

        //Trigger open modal within CreateController
        $scope.addTask = function () {
            $scope.$broadcast('event');
        }

        //Logout user
        $scope.logout = function () {
            ListService.logout().then(data => {
                localStorage.removeItem('nhtodo_access')
                localStorage.removeItem('nhtodo_refresh')
                localStorage.removeItem('nhtodo_user')
                $location.path('/login');
            }).catch(error => {
                console.log(error);
            });
        }

        //Get tasks from service
        function loadData() {
            ListService.getAll().then(data => {
                $scope.tasks = data;
            }).catch(error => {
                if(error.status == 401){
                    $location.path('/login');
                } else {
                    throw new Error(JSON.stringify(error));
                }
            });
        }
    }
]);