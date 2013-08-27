var LoginService = function ($http) {
    return {
        getIdentityProviders: function (callback) {
            $http({ method: 'GET', url: '/identity_providers' }).
                success(function (data, status, headers, config) {
                    callback(data);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        },
        getAuthToken: function (callback) {
            $http({ method: 'GET', url: '/token' }).
                success(function (data, status, headers, config) {
                    callback(data);
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
        }

    };
};
angular.module('adminApp').factory('Login', ['$http', LoginService]);
