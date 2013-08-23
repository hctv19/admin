var BookService = function($resource) {
    var BookResource = $resource(
            API_URL+"/books/:Id",
            { Id: "@Id" },
            {
                update: {method:'PUT'},
                'query': {method: 'GET', isArray: true}
            }
        );

    return {
        getBooks: function (params, callback) {
            var books = BookResource.query(function () {
                callback(books);
            });
        },
        createBook: function (newBook) {
            var newBook = new BookResource(newBook);
            newBook.$save();
        },
        updateBook: function (editBook) {
            editBook.update();
        }
    };
}
angular.module('adminApp').factory('Book', ['$resource', BookService]);