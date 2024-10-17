import * as readline from 'readline';

interface Book {
    id: number;
    title: string;
    authorId: number;
    isBorrowed: boolean;
}

interface Author {
    id: number;
    name: string;
}

interface Member {
    id: number;
    name: string;
    borrowedBooks: number[]; 
}

class Library {
    private books: Book[] = [];
    private authors: Author[] = [];
    private members: Member[] = [];

    private bookIdCounter: number = 1;
    private authorIdCounter: number = 1;
    private memberIdCounter: number = 1;

    addBook(title: string, authorName: string): void {
        let author = this.authors.find((a) => a.name === authorName);
        if (!author) {
            author = { id: this.authorIdCounter++, name: authorName };
            this.authors.push(author);
        }
        const book: Book = { id: this.bookIdCounter++, title, authorId: author.id, isBorrowed: false };
        this.books.push(book);
        console.log(`Book '${title}' by '${authorName}' added to the library.`);
    }

    addMember(name: string): void {
        const member: Member = { id: this.memberIdCounter++, name, borrowedBooks: [] };
        this.members.push(member);
        console.log(`Member '${name}' added to the library.`);
    }

    borrowBook(memberName: string, bookTitle: string): void {
        const member = this.members.find((m) => m.name === memberName);
        const book = this.books.find((b) => b.title === bookTitle);
        if (!member) {
            console.log(`Member '${memberName}' not found.`);
            return;
        }
        if (!book) {
            console.log(`Book '${bookTitle}' not found.`);
            return;
        }
        if (book.isBorrowed) {
            console.log(`Book '${bookTitle}' is already borrowed.`);
            return;
        }

        book.isBorrowed = true;
        member.borrowedBooks.push(book.id);
        console.log(`Book '${bookTitle}' borrowed by '${memberName}'.`);
    }

    returnBook(memberName: string, bookTitle: string): void {
        const member = this.members.find((m) => m.name === memberName);
        const book = this.books.find((b) => b.title === bookTitle);
        if (!member) {
            console.log(`Member '${memberName}' not found.`);
            return;
        }
        if (!book) {
            console.log(`Book '${bookTitle}' not found.`);
            return;
        }
        if (!book.isBorrowed) {
            console.log(`Book '${bookTitle}' is not borrowed.`);
            return;
        }

        book.isBorrowed = false;
        member.borrowedBooks = member.borrowedBooks.filter((id) => id !== book.id);
        console.log(`Book '${bookTitle}' returned by '${memberName}'.`);
    }

    viewAvailableBooks(): void {
        console.log("Available books:");
        this.books.forEach((book) => {
            if (!book.isBorrowed) {
                const author = this.authors.find((a) => a.id === book.authorId);
                console.log(`- ${book.title} by ${author?.name}`);
            }
        });
    }

    viewBooksByAuthor(authorName: string): void {
        const author = this.authors.find((a) => a.name === authorName);
        if (!author) {
            console.log(`Author '${authorName}' not found.`);
            return;
        }
        console.log(`Books by '${authorName}':`);
        this.books
            .filter((book) => book.authorId === author.id)
            .forEach((book) => {
                console.log(`- ${book.title} (${book.isBorrowed ? 'Borrowed' : 'Available'})`);
            });
    }

    viewBorrowedBooks(memberName: string): void {
        const member = this.members.find((m) => m.name === memberName);
        if (!member) {
            console.log(`Member '${memberName}' not found.`);
            return;
        }
        console.log(`Books borrowed by '${memberName}':`);
        member.borrowedBooks.forEach((bookId) => {
            const book = this.books.find((b) => b.id === bookId);
            if (book) {
                console.log(`- ${book.title}`);
            }
        });
    }

    deleteBook(bookTitle: string): void {
        this.books = this.books.filter((book) => book.title !== bookTitle);
        console.log(`Book '${bookTitle}' deleted.`);
    }

    deleteMember(memberName: string): void {
        this.members = this.members.filter((member) => member.name !== memberName);
        console.log(`Member '${memberName}' deleted.`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const library = new Library();

function mainMenu() {
    console.log("\nLibrary Management System");
    console.log("1. Add Book");
    console.log("2. Add Member");
    console.log("3. Borrow Book");
    console.log("4. Return Book");
    console.log("5. View Available Books");
    console.log("6. View Books by Author");
    console.log("7. View Borrowed Books by Member");
    console.log("8. Delete Book");
    console.log("9. Delete Member");
    console.log("0. Exit");

    rl.question("Select an option: ", (option) => {
        switch (option) {
            case '1':
                rl.question("Enter book title: ", (title) => {
                    rl.question("Enter author name: ", (authorName) => {
                        library.addBook(title, authorName);
                        mainMenu();
                    });
                });
                break;
            case '2':
                rl.question("Enter member name: ", (memberName) => {
                    library.addMember(memberName);
                    mainMenu();
                });
                break;
            case '3':
                rl.question("Enter member name: ", (memberName) => {
                    rl.question("Enter book title: ", (bookTitle) => {
                        library.borrowBook(memberName, bookTitle);
                        mainMenu();
                    });
                });
                break;
            case '4':
                rl.question("Enter member name: ", (memberName) => {
                    rl.question("Enter book title: ", (bookTitle) => {
                        library.returnBook(memberName, bookTitle);
                        mainMenu();
                    });
                });
                break;
            case '5':
                library.viewAvailableBooks();
                mainMenu();
                break;
            case '6':
                rl.question("Enter author name: ", (authorName) => {
                    library.viewBooksByAuthor(authorName);
                    mainMenu();
                });
                break;
            case '7':
                rl.question("Enter member name: ", (memberName) => {
                    library.viewBorrowedBooks(memberName);
                    mainMenu();
                });
                break;
            case '8':
                rl.question("Enter book title to delete: ", (bookTitle) => {
                    library.deleteBook(bookTitle);
                    mainMenu();
                });
                break;
            case '9':
                rl.question("Enter member name to delete: ", (memberName) => {
                    library.deleteMember(memberName);
                    mainMenu();
                });
                break;
            case '0':
                rl.close();
                break;
            default:
                console.log("Invalid option, please try again.");
                mainMenu();
                break;
        }
    });
}

mainMenu();
