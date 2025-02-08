// 📚 Create a simple Library System where users can add books, borrow books, return books, and check availability.
// 1. Create an enum called BookGenre with at least 5 book genres.
// 2. Create a type alias called Book which contains: bookId (number), title (string), author (string), genre (BookGenre), isAvailable (boolean).
// 3. Create a function called addBook which will add a new book into the library array. The function needs to return a Book object.
// 4. Create a function called borrowBook which will change the book’s availability to false if available. The return needs to be a string.
// 5. Create a function called returnBook which will change the book’s availability to true. The return needs to be a string.
// 6. Create a function called checkAvailability which will return true if the book is available and false otherwise.
// 7. Create a function called removeBook which will remove a book from the library array. The return needs to be a string.

//enum
enum BookGenre {
  Fantasy,
  ScienceFiction,
  History,
  Romance,
  Mystery,
  Politics
}

//alias
type Book = {
  bookId: number,
  title: string,
  author: string,
  genre: BookGenre,
  isAvailable: boolean
}

const library: Book[] = [];

function addBook(bookId: number, title: string, author: string, genre: BookGenre, isAvailable: boolean): Book {
  const newBook: Book = { bookId, title, author, genre, isAvailable };
  library.push(newBook);
  return newBook;
}

//Borrow
function borrowBook(bookId: number): string {
  const book = library.find(book => book.bookId == bookId);
  if(book){
    if(book.isAvailable){
      book.isAvailable = false;
      return ` ${bookId} has been borrowed`;
    } else {
      return `${bookId} is not available at the moment`;
    }
  }else {
    return ` ${bookId} does not exist in the library`;
  }
}

function returnBook(bookId: number): string {
  const book = library.find(book => book.bookId === bookId);
  if(book){
    if(!book.isAvailable){
      book.isAvailable = true;
      return `${book.title} has been returned`;
    } else {
      return `${book.title} is available`;
    }
  } else {
    return `${bookId} is not in the system. Try another id or title.`
  }
}

function checkAvailability(bookId: number): boolean {
  const book = library.find(book => book.bookId === bookId);
  if(book){
    return book.isAvailable
  } else {
    return false;
  }
}

function removeBook(bookId: number): string {
  const index = library.findIndex(book => book.bookId === bookId);
  if(index != -1){
    const removedBook = library.splice(index, 1)[0];
    return `${removedBook.title} has been removed from the library`; 
  } else {
    return `Book with ID ${bookId} not found`
  }
}

// Test cases (Create more if needed)
console.log(addBook(1, "The Hobbit", "J.R.R. Tolkien", BookGenre.Fantasy, true)) // { bookId: 1, title: "The Hobbit", author: "J.R.R. Tolkien", genre: BookGenre.Fantasy, isAvailable: true }
console.log(addBook(2, "Harry Potter and the Philosopher's Stone", "J.K.Rowling", BookGenre.Fantasy, true))

console.log(borrowBook(1)) // "The Hobbit has been borrowed"

console.log(checkAvailability(1)) // false
console.log(checkAvailability(2))

console.log(returnBook(1)) // "The Hobbit has been returned"

console.log(removeBook(1)) // "The Hobbit has been removed from the library"