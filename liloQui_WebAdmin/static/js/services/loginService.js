adminApp.factory('bookData', function ($rootScope, $http, $log) {
    return {
        getServiceToken: function (rootUrl, successCallback) {
            $http.get("home/GetToken").
                success(function (data, status, headers, config) {
                    $rootScope.serviceToken = data;
                    successCallback();
                }).
                error(function (data, status, headers, config) {
                    $log.warn(data, status, headers, config);
                });
        }
    };
});