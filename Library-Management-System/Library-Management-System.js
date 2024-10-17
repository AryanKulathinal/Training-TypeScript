"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Library = /** @class */ (function () {
    function Library() {
        this.books = [];
        this.authors = [];
        this.members = [];
        this.bookIdCounter = 1;
        this.authorIdCounter = 1;
        this.memberIdCounter = 1;
    }
    Library.prototype.addBook = function (title, authorName) {
        var author = this.authors.find(function (a) { return a.name === authorName; });
        if (!author) {
            author = { id: this.authorIdCounter++, name: authorName };
            this.authors.push(author);
        }
        var book = { id: this.bookIdCounter++, title: title, authorId: author.id, isBorrowed: false };
        this.books.push(book);
        console.log("Book '".concat(title, "' by '").concat(authorName, "' added to the library."));
    };
    Library.prototype.addMember = function (name) {
        var member = { id: this.memberIdCounter++, name: name, borrowedBooks: [] };
        this.members.push(member);
        console.log("Member '".concat(name, "' added to the library."));
    };
    Library.prototype.borrowBook = function (memberName, bookTitle) {
        var member = this.members.find(function (m) { return m.name === memberName; });
        var book = this.books.find(function (b) { return b.title === bookTitle; });
        if (!member) {
            console.log("Member '".concat(memberName, "' not found."));
            return;
        }
        if (!book) {
            console.log("Book '".concat(bookTitle, "' not found."));
            return;
        }
        if (book.isBorrowed) {
            console.log("Book '".concat(bookTitle, "' is already borrowed."));
            return;
        }
        book.isBorrowed = true;
        member.borrowedBooks.push(book.id);
        console.log("Book '".concat(bookTitle, "' borrowed by '").concat(memberName, "'."));
    };
    Library.prototype.returnBook = function (memberName, bookTitle) {
        var member = this.members.find(function (m) { return m.name === memberName; });
        var book = this.books.find(function (b) { return b.title === bookTitle; });
        if (!member) {
            console.log("Member '".concat(memberName, "' not found."));
            return;
        }
        if (!book) {
            console.log("Book '".concat(bookTitle, "' not found."));
            return;
        }
        if (!book.isBorrowed) {
            console.log("Book '".concat(bookTitle, "' is not borrowed."));
            return;
        }
        book.isBorrowed = false;
        member.borrowedBooks = member.borrowedBooks.filter(function (id) { return id !== book.id; });
        console.log("Book '".concat(bookTitle, "' returned by '").concat(memberName, "'."));
    };
    Library.prototype.viewAvailableBooks = function () {
        var _this = this;
        console.log("Available books:");
        this.books.forEach(function (book) {
            if (!book.isBorrowed) {
                var author = _this.authors.find(function (a) { return a.id === book.authorId; });
                console.log("- ".concat(book.title, " by ").concat(author === null || author === void 0 ? void 0 : author.name));
            }
        });
    };
    Library.prototype.viewBooksByAuthor = function (authorName) {
        var author = this.authors.find(function (a) { return a.name === authorName; });
        if (!author) {
            console.log("Author '".concat(authorName, "' not found."));
            return;
        }
        console.log("Books by '".concat(authorName, "':"));
        this.books
            .filter(function (book) { return book.authorId === author.id; })
            .forEach(function (book) {
            console.log("- ".concat(book.title, " (").concat(book.isBorrowed ? 'Borrowed' : 'Available', ")"));
        });
    };
    Library.prototype.viewBorrowedBooks = function (memberName) {
        var _this = this;
        var member = this.members.find(function (m) { return m.name === memberName; });
        if (!member) {
            console.log("Member '".concat(memberName, "' not found."));
            return;
        }
        console.log("Books borrowed by '".concat(memberName, "':"));
        member.borrowedBooks.forEach(function (bookId) {
            var book = _this.books.find(function (b) { return b.id === bookId; });
            if (book) {
                console.log("- ".concat(book.title));
            }
        });
    };
    Library.prototype.deleteBook = function (bookTitle) {
        this.books = this.books.filter(function (book) { return book.title !== bookTitle; });
        console.log("Book '".concat(bookTitle, "' deleted."));
    };
    Library.prototype.deleteMember = function (memberName) {
        this.members = this.members.filter(function (member) { return member.name !== memberName; });
        console.log("Member '".concat(memberName, "' deleted."));
    };
    return Library;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var library = new Library();
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
    rl.question("Select an option: ", function (option) {
        switch (option) {
            case '1':
                rl.question("Enter book title: ", function (title) {
                    rl.question("Enter author name: ", function (authorName) {
                        library.addBook(title, authorName);
                        mainMenu();
                    });
                });
                break;
            case '2':
                rl.question("Enter member name: ", function (memberName) {
                    library.addMember(memberName);
                    mainMenu();
                });
                break;
            case '3':
                rl.question("Enter member name: ", function (memberName) {
                    rl.question("Enter book title: ", function (bookTitle) {
                        library.borrowBook(memberName, bookTitle);
                        mainMenu();
                    });
                });
                break;
            case '4':
                rl.question("Enter member name: ", function (memberName) {
                    rl.question("Enter book title: ", function (bookTitle) {
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
                rl.question("Enter author name: ", function (authorName) {
                    library.viewBooksByAuthor(authorName);
                    mainMenu();
                });
                break;
            case '7':
                rl.question("Enter member name: ", function (memberName) {
                    library.viewBorrowedBooks(memberName);
                    mainMenu();
                });
                break;
            case '8':
                rl.question("Enter book title to delete: ", function (bookTitle) {
                    library.deleteBook(bookTitle);
                    mainMenu();
                });
                break;
            case '9':
                rl.question("Enter member name to delete: ", function (memberName) {
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
