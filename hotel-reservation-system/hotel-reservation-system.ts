import * as readline from 'readline';

interface Room {
    id: number;
    type: string;
    pricePerNight: number;
    isBooked: boolean;
}

class Hotel {
    private rooms: Room[] = [];

    constructor() {
        this.initializeRooms();
    }

    private initializeRooms() {
        this.rooms = [
            { id: 1, type: 'Single', pricePerNight: 100, isBooked: false },
            { id: 2, type: 'Double', pricePerNight: 150, isBooked: false },
            { id: 3, type: 'Suite', pricePerNight: 250, isBooked: false },
        ];
    }

    public displayRooms() {
        console.log("Available Rooms:");
        this.rooms.forEach(room => {
            if (!room.isBooked) {
                console.log(`Room ID: ${room.id}, Type: ${room.type}, Price per Night: $${room.pricePerNight}`);
            }
        });
    }

    public bookRoom(roomId: number, numberOfNights: number) {
        const room = this.rooms.find(r => r.id === roomId);
        if (room) {
            if (!room.isBooked) {
                room.isBooked = true;
                const totalCost = room.pricePerNight * numberOfNights;
                console.log(`Room booked successfully! Total cost for ${numberOfNights} nights: $${totalCost}`);
            } else {
                console.log('Sorry, this room is already booked.');
            }
        } else {
            console.log('Invalid Room ID.');
        }
    }

    public cancelBooking(roomId: number) {
        const room = this.rooms.find(r => r.id === roomId);
        if (room) {
            if (room.isBooked) {
                room.isBooked = false;
                console.log('Booking cancelled successfully.');
            } else {
                console.log('This room is not booked.');
            }
        } else {
            console.log('Invalid Room ID.');
        }
    }
}

const hotel = new Hotel();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mainMenu() {
    console.log("\n--- Hotel Reservation System ---");
    console.log("1. View Rooms");
    console.log("2. Book a Room");
    console.log("3. Cancel a Booking");
    console.log("4. Exit");

    rl.question("Choose an option (1-4): ", (choice) => {
        switch (choice) {
            case '1':
                hotel.displayRooms();
                mainMenu(); // Call the menu again after viewing rooms
                break;
            case '2':
                rl.question("Enter Room ID to book: ", (roomId) => {
                    rl.question("Enter number of nights: ", (nights) => {
                        hotel.bookRoom(Number(roomId), Number(nights));
                        mainMenu(); // Call the menu again after booking
                    });
                });
                break;
            case '3':
                rl.question("Enter Room ID to cancel: ", (cancelRoomId) => {
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
