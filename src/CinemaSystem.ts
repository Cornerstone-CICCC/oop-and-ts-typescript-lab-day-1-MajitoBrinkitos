// 🎟️ Create a Movie Ticket Booking System where users can book tickets and check seat availability.
// 1. Create an enum called MovieGenre with at least 5 movie genres.
// 2. Create a tuple type called Seat which holds (rowLetter: string, seatNumber: number).
// 3. Create a type alias called Movie which contains: movieId (number), title (string), genre (MovieGenre), availableSeats (Seat[]).
// 4. Create a function called addMovie which adds a movie to the movies array. The function needs to return a Movie object.
// 5. Create a function called bookSeat which removes a seat from availableSeats if available. The return needs to be a string.
// 6. Create a function called checkSeatAvailability which returns true if a seat is available and false otherwise.

enum MovieGenre {
  Action,
  Romance,
  Drama,
  Comedy,
  Documentary,
  Horror
}

//Tuple
type Seat = [rowLetter: string, seatNumber: number];

//Alias
type Movie = {
  movieId: number,
  title: string,
  genre: MovieGenre,
  availableSeats: Seat []
}

//Array of movies
const movies: Movie[] = [];

function addMovie(movieId: number, title: string, genre: MovieGenre, availableSeats: Seat[]): Movie {
  const newMovie: Movie = { movieId, title, genre, availableSeats };
  movies.push(newMovie);
  return newMovie;
}

function bookSeat(movieId: number, rowLetter: string, seatNumber: number): string {
  const movie = movies.find(movie => movie.movieId === movieId);
  if(movie) {
    const seatIndex = movie.availableSeats.findIndex(seat => seat [0] === rowLetter && seat [1] === seatNumber);
    if(seatIndex !== -1){
      movie.availableSeats.splice(seatIndex, 1);
      return `Your booking info: ${rowLetter}${seatNumber}`
    } else {
      return `Seat ${rowLetter}${seatNumber} not available.`
    }
  }else {
    return `This title is not available ${movieId}`;
  }
}

function checkSeatAvailability(movieId: number, rowLetter: string, seatNumber: number): boolean {
  const movie = movies.find(movie => movie.movieId === movieId);
  if(movie){
    return movie.availableSeats.some(seat => seat [0] === rowLetter && seat[1] === seatNumber);
  } else {
    return false;
  }
}

// Test cases (Create more if needed)
console.log(addMovie(1, "Avengers", MovieGenre.Action, [["A", 1], ["A", 2]])) // { movieId: 1, title: "Avengers", genre: MovieGenre.Action, availableSeats: [["A", 1], ["A", 2]] }
console.log(addMovie(2, "Casino Royal", MovieGenre.Action, [["K", 14], ["U", 26]]))
console.log(addMovie(3, "Casablanca", MovieGenre.Drama, [["F", 5], ["F", 6]]))

//Booking
console.log(bookSeat(1, "A", 1)) // "Seat A1 booked successfully"
console.log(bookSeat(2, "K", 12))

//Availability
console.log(checkSeatAvailability(1, "A", 1)) // false