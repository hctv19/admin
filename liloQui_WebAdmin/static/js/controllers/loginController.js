'use strict';

var LoginController = function (Login, $scope, $log) {
    $scope.loggedIn = false;
    $scope.showLoginWindow = false;
    $scope.getLoginOptions = function () {
        $scope.showLoginWindow = true;
        Login.getIdentityProviders(function (providers) {
            $scope.identityProviders = providers;
        });
    };
};

angular.module('adminApp').controller('LoginController', ['Login', "$scope", "$log", LoginController]);