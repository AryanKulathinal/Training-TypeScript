import * as readline from 'readline';

type Seat = {
  id: string;
  isBooked: boolean;
};

class Theatre {
  private rows: number;
  private seatsPerRow: number;
  private seats: Seat[][];

  constructor(rows: number, seatsPerRow: number) {
    this.rows = rows;
    this.seatsPerRow = seatsPerRow;
    this.seats = this.createSeats();
  }

 
  private createSeats(): Seat[][] {
    return Array.from({ length: this.rows }, (_, rowIndex) =>
      Array.from({ length: this.seatsPerRow }, (_, seatIndex) => ({
        id: `${rowIndex + 1}-${seatIndex + 1}`,
        isBooked: false,
      })),
    );
  }


  public getSeats(): Seat[][] {
    return this.seats;
  }

  
  public displaySeats(): void {
    console.log("\nSeating Arrangement (O = Free, X = Booked):\n");
    this.seats.forEach(row => {
      console.log(
        row.map(seat => (seat.isBooked ? 'X' : 'O')).join(' ')
      );
    });
    console.log('\n');
  }

  
  public bookSeat(seatId: string): string {
    const seat = this.seats.flat().find(seat => seat.id === seatId);
    if (!seat) {
      throw new Error('Seat not found');
    }
    if (seat.isBooked) {
      throw new Error('Seat already booked');
    }
    seat.isBooked = true;
    return `Seat ${seatId} booked successfully.`;
  }

 
  public cancelSeat(seatId: string): string {
    const seat = this.seats.flat().find(seat => seat.id === seatId);
    if (!seat) {
      throw new Error('Seat not found');
    }
    if (!seat.isBooked) {
      throw new Error('Seat is not booked');
    }
    seat.isBooked = false;
    return `Seat ${seatId} booking canceled successfully.`;
  }
}


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const theatre = new Theatre(7, 10); 

function showMenu(): void {
  console.log('\nChoose an option:');
  console.log('1. View Seats');
  console.log('2. Book a Seat');
  console.log('3. Cancel a Seat');
  console.log('4. Exit');
  rl.question('\nEnter your choice: ', handleUserChoice);
}

function handleUserChoice(choice: string): void {
  switch (choice) {
    case '1':
      theatre.displaySeats();
      showMenu();
      break;
    case '2':
      rl.question('\nEnter seat ID to book (e.g., 1-1): ', seatId => {
        try {
          console.log(theatre.bookSeat(seatId));
        } catch (error) {
          console.error((error as Error).message);
        }
        showMenu();
      });
      break;
    case '3':
      rl.question('\nEnter seat ID to cancel (e.g., 1-1): ', seatId => {
        try {
          console.log(theatre.cancelSeat(seatId));
        } catch (error) {
          console.error((error as Error).message);
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
