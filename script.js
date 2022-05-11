//query selectors
const addBookBtn = document.querySelector("#add-book")


//initialize library in array

let myLibrary = [];

//Book constructor
function Book (title, author, page, haveRead) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.readStatus = haveRead ? "have read" : "have not read";
    this.info = function() {
        console.log(`${this.title} by ${this.author}, ${page} pages, ${this.readStatus}`)
    }
}

function addBookToLibrary() {
    //to fill it up later
}