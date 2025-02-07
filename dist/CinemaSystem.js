"use strict";
// 🎟️ Create a Movie Ticket Booking System where users can book tickets and check seat availability.
// 1. Create an enum called MovieGenre with at least 5 movie genres.
// 2. Create a tuple type called Seat which holds (rowLetter: string, seatNumber: number).
// 3. Create a type alias called Movie which contains: movieId (number), title (string), genre (MovieGenre), availableSeats (Seat[]).
// 4. Create a function called addMovie which adds a movie to the movies array. The function needs to return a Movie object.
// 5. Create a function called bookSeat which removes a seat from availableSeats if available. The return needs to be a string.
// 6. Create a function called checkSeatAvailability which returns true if a seat is available and false otherwise.
var MovieGenre;
(function (MovieGenre) {
    MovieGenre[MovieGenre["Action"] = 0] = "Action";
    MovieGenre[MovieGenre["Romance"] = 1] = "Romance";
    MovieGenre[MovieGenre["Drama"] = 2] = "Drama";
    MovieGenre[MovieGenre["Comedy"] = 3] = "Comedy";
    MovieGenre[MovieGenre["Documentary"] = 4] = "Documentary";
    MovieGenre[MovieGenre["Horror"] = 5] = "Horror";
})(MovieGenre || (MovieGenre = {}));
//Array of movies
var movies = [];
function addMovie(movieId, title, genre, availableSeats) {
    var newMovie = { movieId: movieId, title: title, genre: genre, availableSeats: availableSeats };
    movies.push(newMovie);
    return newMovie;
}
function bookSeat(movieId, rowLetter, seatNumber) {
    var movie = movies.find(function (movie) { return movie.movieId === movieId; });
    if (movie) {
        var seatIndex = movie.availableSeats.findIndex(function (seat) { return seat[0] === rowLetter && seat[1] === seatNumber; });
        if (seatIndex !== -1) {
            movie.availableSeats.splice(seatIndex, 1);
            return "Your booking info: ".concat(rowLetter).concat(seatNumber);
        }
        else {
            return "Seat ".concat(rowLetter).concat(seatNumber, " not available.");
        }
    }
    else {
        return "This title is not available ".concat(movieId);
    }
}
function checkSeatAvailability(movieId, rowLetter, seatNumber) {
    var movie = movies.find(function (movie) { return movie.movieId === movieId; });
    if (movie) {
        return movie.availableSeats.some(function (seat) { return seat[0] === rowLetter && seat[1] === seatNumber; });
    }
    else {
        return false;
    }
}
// Test cases (Create more if needed)
console.log(addMovie(1, "Avengers", MovieGenre.Action, [["A", 1], ["A", 2]])); // { movieId: 1, title: "Avengers", genre: MovieGenre.Action, availableSeats: [["A", 1], ["A", 2]] }
console.log(addMovie(2, "Casino Royal", MovieGenre.Action, [["K", 14], ["U", 26]]));
console.log(addMovie(3, "Casablanca", MovieGenre.Drama, [["F", 5], ["F", 6]]));
//Booking
console.log(bookSeat(1, "A", 1)); // "Seat A1 booked successfully"
console.log(bookSeat(2, "K", 12));
//Availability
console.log(checkSeatAvailability(1, "A", 1)); // false
