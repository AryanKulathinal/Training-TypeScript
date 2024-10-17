"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Theatre = /** @class */ (function () {
    function Theatre(rows, seatsPerRow) {
        this.rows = rows;
        this.seatsPerRow = seatsPerRow;
        this.seats = this.createSeats();
    }
    Theatre.prototype.createSeats = function () {
        var _this = this;
        return Array.from({ length: this.rows }, function (_, rowIndex) {
            return Array.from({ length: _this.seatsPerRow }, function (_, seatIndex) { return ({
                id: "".concat(rowIndex + 1, "-").concat(seatIndex + 1),
                isBooked: false,
            }); });
        });
    };
    Theatre.prototype.getSeats = function () {
        return this.seats;
    };
    Theatre.prototype.displaySeats = function () {
        console.log("\nSeating Arrangement (O = Free, X = Booked):\n");
        this.seats.forEach(function (row) {
            console.log(row.map(function (seat) { return (seat.isBooked ? 'X' : 'O'); }).join(' '));
        });
        console.log('\n');
    };
    Theatre.prototype.bookSeat = function (seatId) {
        var seat = this.seats.flat().find(function (seat) { return seat.id === seatId; });
        if (!seat) {
            throw new Error('Seat not found');
        }
        if (seat.isBooked) {
            throw new Error('Seat already booked');
        }
        seat.isBooked = true;
        return "Seat ".concat(seatId, " booked successfully.");
    };
    Theatre.prototype.cancelSeat = function (seatId) {
        var seat = this.seats.flat().find(function (seat) { return seat.id === seatId; });
        if (!seat) {
            throw new Error('Seat not found');
        }
        if (!seat.isBooked) {
            throw new Error('Seat is not booked');
        }
        seat.isBooked = false;
        return "Seat ".concat(seatId, " booking canceled successfully.");
    };
    return Theatre;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var theatre = new Theatre(7, 10);
function showMenu() {
    console.log('\nChoose an option:');
    console.log('1. View Seats');
    console.log('2. Book a Seat');
    console.log('3. Cancel a Seat');
    console.log('4. Exit');
    rl.question('\nEnter your choice: ', handleUserChoice);
}
function handleUserChoice(choice) {
    switch (choice) {
        case '1':
            theatre.displaySeats();
            showMenu();
            break;
        case '2':
            rl.question('\nEnter seat ID to book (e.g., 1-1): ', function (seatId) {
                try {
                    console.log(theatre.bookSeat(seatId));
                }
                catch (error) {
                    console.error(error.message);
                }
                showMenu();
            });
            break;
        case '3':
            rl.question('\nEnter seat ID to cancel (e.g., 1-1): ', function (seatId) {
                try {
                    console.log(theatre.cancelSeat(seatId));
                }
                catch (error) {
                    console.error(error.message);
                }
                showMenu();
            });
            break;
        case '4':
            console.log('Exiting...');
            rl.close();
            break;
        default:
            console.log('Invalid choice. Try again.');
            showMenu();
    }
}
console.log('Welcome to the Theatre Booking System!');
showMenu();
