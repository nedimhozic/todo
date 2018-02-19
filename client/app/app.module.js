var toDoApp = angular.module('rootModule', ["ngRoute"]);

//Handling errors
toDoApp.config(function ($provide) {
    $provide.decorator('$exceptionHandler',
        ['$delegate', function extendExceptionHandler($delegate) {
            return function (exception, cause) {
                let error = JSON.parse(exception.message);
                message = error.message;
                if (error.message) {
                    document.querySelector('.toastr .content').innerHTML = error.message;
                    document.querySelector('.toastr').style.display = 'initial';
                    setTimeout(function () {
                        document.querySelector('.toastr').style.display = 'none';
                    }, 5000);
                }
                $delegate(exception, cause);
            };
        }]);
});