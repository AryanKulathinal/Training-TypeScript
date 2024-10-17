"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Hotel = /** @class */ (function () {
    function Hotel() {
        this.rooms = [];
        this.initializeRooms();
    }
    Hotel.prototype.initializeRooms = function () {
        this.rooms = [
            { id: 1, type: 'Single', pricePerNight: 100, isBooked: false },
            { id: 2, type: 'Double', pricePerNight: 150, isBooked: false },
            { id: 3, type: 'Suite', pricePerNight: 250, isBooked: false },
        ];
    };
    Hotel.prototype.displayRooms = function () {
        console.log("Available Rooms:");
        this.rooms.forEach(function (room) {
            if (!room.isBooked) {
                console.log("Room ID: ".concat(room.id, ", Type: ").concat(room.type, ", Price per Night: $").concat(room.pricePerNight));
            }
        });
    };
    Hotel.prototype.bookRoom = function (roomId, numberOfNights) {
        var room = this.rooms.find(function (r) { return r.id === roomId; });
        if (room) {
            if (!room.isBooked) {
                room.isBooked = true;
                var totalCost = room.pricePerNight * numberOfNights;
                console.log("Room booked successfully! Total cost for ".concat(numberOfNights, " nights: $").concat(totalCost));
            }
            else {
                console.log('Sorry, this room is already booked.');
            }
        }
        else {
            console.log('Invalid Room ID.');
        }
    };
    Hotel.prototype.cancelBooking = function (roomId) {
        var room = this.rooms.find(function (r) { return r.id === roomId; });
        if (room) {
            if (room.isBooked) {
                room.isBooked = false;
                console.log('Booking cancelled successfully.');
            }
            else {
                console.log('This room is not booked.');
            }
        }
        else {
            console.log('Invalid Room ID.');
        }
    };
    return Hotel;
}());
var hotel = new Hotel();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function mainMenu() {
    console.log("\n--- Hotel Reservation System ---");
    console.log("1. View Rooms");
    console.log("2. Book a Room");
    console.log("3. Cancel a Booking");
    console.log("4. Exit");
    rl.question("Choose an option (1-4): ", function (choice) {
        switch (choice) {
            case '1':
                hotel.displayRooms();
                mainMenu(); // Call the menu again after viewing rooms
                break;
            case '2':
                rl.question("Enter Room ID to book: ", function (roomId) {
                    rl.question("Enter number of nights: ", function (nights) {
                        hotel.bookRoom(Number(roomId), Number(nights));
                        mainMenu(); // Call the menu again after booking
                    });
                });
                break;
            case '3':
                rl.question("Enter Room ID to cancel: ", function (cancelRoomId) {
                    hotel.cancelBooking(Number(cancelRoomId));
                    mainMenu(); // Call the menu again after cancelling
                });
                break;
            case '4':
                console.log('Thank you for using the Hotel Reservation System!');
                rl.close();
                break;
            default:
                console.log('Invalid option, please try again.');
                mainMenu(); // Call the menu again for another action
        }
    });
}
mainMenu();
