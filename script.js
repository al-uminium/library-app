//query selectors
const addBookBtn = document.querySelector("#add-book");
const modalAddBookBtn = document.querySelector("#modal-add-book")
const closeModalBtn = document.querySelector(".close-btn");
const modalForm = document.querySelector("#modal-form");

const bookTitleInput = document.querySelector("#book-title");
const bookAuthorInput = document.querySelector("#book-author");
const bookPageInput = document.querySelector("#book-page");
const bookReadInput = document.querySelector("#book-read")



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

function addBookToLibrary(title, author, page, haveRead) {
    const newBook = Book(title, author, page, haveRead)
    myLibrary.push(newBook)
}

const getModalInputValues = () => {
    const bookTitle = bookTitleInput.value;
    const bookAuthor = bookAuthorInput.value;
    const bookPage = bookPageInput.value;
    const bookReadStatus = bookAuthorInput.checked;

    return [
        bookTitle, 
        bookAuthor,
        bookPage,
        bookReadStatus
    ]
}

//event listeners
closeModalBtn.addEventListener("click", () => {
    modalForm.classList.toggle("close")
})

addBookBtn.addEventListener("click", () => {
    modalForm.classList.toggle("close")
})

