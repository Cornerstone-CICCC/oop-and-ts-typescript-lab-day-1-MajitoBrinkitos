"use strict";
// 📚 Create a simple Library System where users can add books, borrow books, return books, and check availability.
// 1. Create an enum called BookGenre with at least 5 book genres.
// 2. Create a type alias called Book which contains: bookId (number), title (string), author (string), genre (BookGenre), isAvailable (boolean).
// 3. Create a function called addBook which will add a new book into the library array. The function needs to return a Book object.
// 4. Create a function called borrowBook which will change the book’s availability to false if available. The return needs to be a string.
// 5. Create a function called returnBook which will change the book’s availability to true. The return needs to be a string.
// 6. Create a function called checkAvailability which will return true if the book is available and false otherwise.
// 7. Create a function called removeBook which will remove a book from the library array. The return needs to be a string.
//enum
var BookGenre;
(function (BookGenre) {
    BookGenre[BookGenre["Fantasy"] = 0] = "Fantasy";
    BookGenre[BookGenre["ScienceFiction"] = 1] = "ScienceFiction";
    BookGenre[BookGenre["History"] = 2] = "History";
    BookGenre[BookGenre["Romance"] = 3] = "Romance";
    BookGenre[BookGenre["Mystery"] = 4] = "Mystery";
    BookGenre[BookGenre["Politics"] = 5] = "Politics";
})(BookGenre || (BookGenre = {}));
var library = [];
function addBook(bookId, title, author, genre, isAvailable) {
    var newBook = { bookId: bookId, title: title, author: author, genre: genre, isAvailable: isAvailable };
    library.push(newBook);
    return newBook;
}
//Borrow
function borrowBook(bookId) {
    var book = library.find(function (book) { return book.bookId == bookId; });
    if (book) {
        if (book.isAvailable) {
            book.isAvailable = false;
            return " ".concat(bookId, " has been borrowed");
        }
        else {
            return "".concat(bookId, " is not available at the moment");
        }
    }
    else {
        return " ".concat(bookId, " does not exist in the library");
    }
}
function returnBook(bookId) {
    var book = library.find(function (book) { return book.bookId === bookId; });
    if (book) {
        if (!book.isAvailable) {
            book.isAvailable = true;
            return "".concat(book.title, " has been returned");
        }
        else {
            return "".concat(book.title, " is available");
        }
    }
    else {
        return "".concat(bookId, " is not in the system. Try another id or title.");
    }
}
function checkAvailability(bookId) {
    var book = library.find(function (book) { return book.bookId === bookId; });
    if (book) {
        return book.isAvailable;
    }
    else {
        return false;
    }
}
function removeBook(bookId) {
    var index = library.findIndex(function (book) { return book.bookId === bookId; });
    if (index != -1) {
        var removedBook = library.splice(index, 1)[0];
        return "".concat(removedBook.title, " has been removed from the library");
    }
    else {
        return "Book with ID ".concat(bookId, " not found");
    }
}
// Test cases (Create more if needed)
console.log(addBook(1, "The Hobbit", "J.R.R. Tolkien", BookGenre.Fantasy, true)); // { bookId: 1, title: "The Hobbit", author: "J.R.R. Tolkien", genre: BookGenre.Fantasy, isAvailable: true }
console.log(addBook(2, "Harry Potter and the Philosopher's Stone", "J.K.Rowling", BookGenre.Fantasy, true));
console.log(borrowBook(1)); // "The Hobbit has been borrowed"
console.log(checkAvailability(1)); // false
console.log(checkAvailability(2));
console.log(returnBook(1)); // "The Hobbit has been returned"
console.log(removeBook(1)); // "The Hobbit has been removed from the library"
