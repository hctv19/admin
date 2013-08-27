'use strict';

var AccountsController = function (Account, $scope, $log) {
    $scope.fetchAccounts = function () {
    };

    $scope.fetchAccounts();
};

angular.module('adminApp').controller('AccountsController', ['Account', "$scope", "$log", AccountsController]);