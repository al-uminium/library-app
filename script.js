//query selectors
const addBookBtn = document.querySelector("#add-book");
const modalAddBookBtn = document.querySelector("#modal-add-book")
const closeModalBtn = document.querySelector(".close-btn");
const modalForm = document.querySelector("#modal-form");
const libraryContainer = document.querySelector("#library-container")

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
    this.readStatus = haveRead ? "read" : "unread";
    this.info = function() {
        console.log(`${this.title} by ${this.author}, ${page} pages, ${this.readStatus}`)
    }
}

//Helper functions
function addBookToLibrary(title, author, page, haveRead) {
    const newBook = new Book(title, author, page, haveRead)
    myLibrary.push(newBook)
}

const getModalInputValues = () => {
    const bookTitle = bookTitleInput.value;
    const bookAuthor = bookAuthorInput.value;
    const bookPage = bookPageInput.value;
    const bookReadStatus = bookReadInput.checked;

    return [
        bookTitle, 
        bookAuthor,
        bookPage,
        bookReadStatus
    ]
}

const toggleBookReadStatus = (btnParent) => {
    const readSpan = btnParent.previousElementSibling.childNodes[1].lastElementChild
    const eyeSpan = btnParent.childNodes[0]

    readSpan.innerText = readSpan.innerText === "{read}" ? "{unread}" : "{read}"
    eyeSpan.innerText = eyeSpan.innerText === "visibility" ? "visibility_off" : "visibility";
}

const toggleModal = () => {
    modalForm.classList.toggle("close")
}

const createBookCard = (book, index) => {
    //create book card elements
    const bookCard = document.createElement("div")
    const bookContainer = document.createElement("div")
    const titleContainer = document.createElement("div")
    const pageContainer = document.createElement("div")
    const cardButtonContainer = document.createElement("div")

    const titleSpan = document.createElement("span")
    const authorSpan = document.createElement("span")
    const pageSpan = document.createElement("span")
    const readStatusSpan = document.createElement("span")
    const toggleReadSpan = document.createElement("span")
    const deleteCardSpan = document.createElement("span")
    const titleTextNode = document.createTextNode(" by ")
    const pageTextNode = document.createTextNode(" ")

    //Assign classes
    bookCard.classList.add("book-card")
    bookContainer.classList.add("book-container")
    cardButtonContainer.classList.add("card-button-container")
    titleSpan.classList.add("title")
    authorSpan.classList.add("author")
    pageSpan.classList.add("page")
    readStatusSpan.classList.add("read-status")
    toggleReadSpan.classList.add("material-icons-outlined", "md-light", "read-btn")
    deleteCardSpan.classList.add("material-icons-outlined", "md-light", "del-btn")

    //Putting them together
    titleContainer.appendChild(titleSpan)
    titleContainer.appendChild(titleTextNode)
    titleContainer.appendChild(authorSpan)
    pageContainer.appendChild(pageSpan)
    pageContainer.appendChild(pageTextNode)
    pageContainer.appendChild(readStatusSpan)
    bookContainer.appendChild(titleContainer)
    bookContainer.appendChild(pageContainer)
    bookCard.appendChild(bookContainer)

    cardButtonContainer.appendChild(toggleReadSpan)
    cardButtonContainer.appendChild(deleteCardSpan)
    cardButtonContainer.dataset.index = index
    bookCard.appendChild(cardButtonContainer)

    libraryContainer.appendChild(bookCard)

    // get book values
    const bookTitle = book.title
    const bookAuthor = book.author
    const bookPage = book.page
    const bookReadStatus = book.readStatus

    // assign book values to card
    titleSpan.innerText = bookTitle
    authorSpan.innerText = bookAuthor
    pageSpan.innerText = `{${bookPage} pages}`
    readStatusSpan.innerText = `{${bookReadStatus}}`
    toggleReadSpan.innerText = bookReadStatus === "read" ? "visibility" : "visibility_off"
    deleteCardSpan.innerText = "delete"
}

const renderBookCards = () => {
    libraryContainer.innerHTML = ""
    myLibrary.forEach((book, index) => {
        createBookCard(book, index)
    });

    const delBtn = document.querySelectorAll(".del-btn")
    const readBtn = document.querySelectorAll(".read-btn")

    delBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            deleteBook(btn.parentElement)
        })
    });
    readBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            toggleBookReadStatus(btn.parentElement)
        })
    })
}

const deleteBook = (btnParent) => {
    const btnParentIndex = btnParent.dataset.index;
    myLibrary.splice(btnParentIndex,1);
    renderBookCards()
}

//Event Listeners
closeModalBtn.addEventListener("click", () => {
    toggleModal()
})

addBookBtn.addEventListener("click", () => {
    toggleModal()
})

modalAddBookBtn.addEventListener("click", () => {
    const modalInputValues = getModalInputValues();
    addBookToLibrary(...modalInputValues);
    renderBookCards();
    toggleModal();
})

const testBook_1 = new Book("ABCDEFU", "Gayle", 10, true);
const testBook_2 = new Book("Sapiens: A Brief History of Humankind", "Yuval Noah Harari", 756, false)
const testBook_3 = new Book("The Story of Philosophy", "Will Durant", 2006, false)

