toDoApp.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/components/task/list/list.html",
            controller: 'ListController'
        })
        .when("/login", {
            templateUrl: "app/components/user/login/login.html",
            controller: 'LoginController'
        })
        .when("/registration", {
            templateUrl: "app/components/user/registration/registration.html",
            controller: 'RegistrationController'
        })
});