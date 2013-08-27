var AccountService = function ($resource) {
    var AccountResource = $resource(
            API_URL + "/accounts/:Id",
            { Id: "@Id" },
            {
                update: { method: 'PUT' },
                'query': { method: 'GET', isArray: true }
            }
        );

    return {
        getAccounts: function (params, callback) {
            var accounts = AccountResource.query(function () {
                callback(accounts);
            });
        },
        createAccount: function (newAccount) {
            var newAccount = new AccountResource(newAccount);
            newAccount.$save();
        }
    };
}
angular.module('adminApp').factory('Account', ['$resource', AccountService]);