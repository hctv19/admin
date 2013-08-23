'use strict';

var BooksController = function (Book, $scope, $log) {
    $scope.editMode = false;
    $scope.books = [];
    $scope.editBookModel = new BookModel();
    $scope.openBookEditor = function (bookId) {
        var book = _.find($scope.books, function (editBook) { return editBook.Id == bookId; });
        if (book) {
            $scope.editBookModel = book;
            $scope.editMode = true;
        }
        else {
            $log.warn("Book not found to edit");
        }

    }
    $scope.closeBookEditor = function () {
        $scope.editMode = false;
    };
    $scope.saveBook = function () {
        if ($scope.editBook.Id) {
            Book.updateBook($scope.editBook);
        }
        else {
            Book.createBook($scope.editBook);
        }
    };
    $scope.fetchBooks = function () {
        Book.getBooks({}, function (results) {
            $scope.books = results
        });
    };

    $scope.fetchBooks();
};

angular.module('adminApp').controller('BooksController', ['Book', "$scope", "$log", BooksController]);