toDoApp.filter('DateFilter', function ($filter) {
    //Filter for date format
    return function (input) {
        if (!(input instanceof Date)) { input = new Date(input); }
        if (input == null) return undefined;

        return $filter('date')(input, 'dd/MM/yyyy hh:mm a');
    }
})