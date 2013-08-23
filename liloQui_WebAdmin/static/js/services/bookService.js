var myModule = angular.module('adminApp', ['ngResource']);
var BookService = function($resource) {
    var Book = $resource(
            API_URL+"/books/:Id",
            { Id: "@Id" },
            {
                update: {method:'PUT'},
                'query': {method: 'GET', isArray: true}
            }
        );

    return {
        getBooks: function (params, callback) {
            var books = Book.query(function () {
                //_.each(books, function (book) {
                //    //expect(book instanceof Book).toEqual(true);
                //});
                callback(books);

            });
        },
        createBook: function (newBook) {
            var newBook = new Book(newBook);
            newBook.$save();
        },
        updateBook: function (editBook) {
            editBook.update();
        }
    };
}
myModule.factory('Book', ['$resource', BookService]);