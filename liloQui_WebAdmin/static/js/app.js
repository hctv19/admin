'use strict';
var API_URL = "http://86606ebaa2e24503b6709cfaa5490eca.cloudapp.net";
//var API_URL = "http://localhost";
var adminApp = angular.module("adminApp", ['ngResource']);

adminApp.config(function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
});

//adminApp.directive('moDateInput', function ($window) {
//    return {
//        require: '^ngModel',
//        restrict: 'A',
//        link: function (scope, elm, attrs, ctrl) {
//            var moment = $window.moment;
//            var dateFormat = attrs.moMediumDate;
//            attrs.$observe('moDateInput', function (newValue) {
//                if (dateFormat == newValue || !ctrl.$modelValue) return;
//                dateFormat = newValue;
//                ctrl.$modelValue = new Date(ctrl.$setViewValue);
//            });

//            ctrl.$formatters.unshift(function (modelValue) {
//                scope = scope;
//                if (!dateFormat || !modelValue) return "";
//                var retVal = moment(modelValue).format(dateFormat);
//                return retVal;
//            });

//            ctrl.$parsers.unshift(function (viewValue) {
//                scope = scope;
//                var date = moment(viewValue, dateFormat);
//                return (date && date.isValid() && date.year() > 1950) ? date.toDate() : "";
//            });
//        }
//    };
//});

//Add this to have access to a global variable
adminApp.run(function ($rootScope) {
    $rootScope.serviceToken = null; //global variable
    $rootScope.getAuthHeader = function () {
        return { 'Authentication': 'Bearer '+$rootScope.serviceToken };
    };
});