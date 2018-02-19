toDoApp.controller('CreateController', ['$scope', 'CreateService',
    function ($scope, CreateService) {
        $scope.submitted = false;
        $scope.submitForm = function () {
            $scope.submitted = true;
            if ($scope.addTaskForm.$invalid) {
                return;
            }
            let task = {
                title: $scope.title,
                description: $scope.desc
            }
            CreateService.create(task)
                .then(data => {
                    $scope.$emit('reload-list');
                    close();
                }).catch(error => {
                    console.log(error);
                })
        }

        //Click on cancel button to hide modal
        $scope.cancel = function () {
            close();
        }

        //Event for open modal
        $scope.$on('event', function () {
            open();
        });

        //Show modal
        function open() {
            document.querySelector('.overlay').style.display = 'flex';
        }

        //Close modal and remove fields
        function close() {
            $scope.submitted = false;
            $scope.title = '';
            $scope.desc = '';
            document.querySelector('.overlay').style.display = 'none';
        }
    }
]);