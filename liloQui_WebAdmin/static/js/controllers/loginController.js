'use strict';

var LoginController = function (Login, $scope, $rootScope, $log) {
    $scope.loggedIn = false;
    $scope.showLoginWindow = false;
    $scope.getLoginOptions = function () {
        $scope.showLoginWindow = true;
        Login.getIdentityProviders(function (providers) {
            $scope.identityProviders = providers;
        });
    };
    $scope.getAuthToken = function () {
        Login.getAuthToken(function (token) {
            if (token) {
                $rootScope.serviceToken = token;
                $scope.loggedIn = true;
            }
        });
    };
    $scope.getAuthToken();
};

angular.module('adminApp').controller('LoginController', ['Login', "$scope", "$rootScope", "$log", LoginController]);