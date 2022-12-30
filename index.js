//library stuff
const shelf = document.querySelector('.shelf')
let myLibrary = []

const readMoji = {
    on: '✔️',
    undefined: '🗙',
    off: '🗙',
}

//book card

let currentBookCard = {
    id: '',
    title: '',
    author: '',
    pages: '',
    read: '',
}

//form
const titleInput = document.querySelector('#title')
const authorInput = document.querySelector('#author')
const pagesInput = document.querySelector('#pages')
const readInput = document.querySelector('#read')
const submitBtn = document.querySelector('.submit-btn')



//html
const newBookBtn = document.querySelector('.new-book-btn')
const newBookFormContainer = document.querySelector('#new-book-form-container')
const closeBtn = document.querySelector('.close-btn')
const container = document.querySelector('#container')


//event listeners
newBookBtn.addEventListener('click', () => {
    newBookFormContainer.style.display = 'grid'
    //container.style.filter = 'blur(8px)'
})

closeBtn.addEventListener('click', () => {
    newBookFormContainer.style.display = 'none'
    container.style.filter = 'blur(0px)'
})

submitBtn.addEventListener('click', () => {
    console.log(readInput.value)
    addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readInput.value)
    clearForm()
})

readInput.addEventListener('click', () => {
    readInput.value = readInput.value == 'off' ? readInput.value = 'on' : readInput.value ='off'
})

function clearForm() {
    titleInput.value = null
    authorInput.value = null
    pagesInput.value = null
}


function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.getIndex = () => {
        return myLibrary.indexOf(this)
    }
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read))
    console.table(myLibrary)
    updateLibrary()
}

function updateLibrary() {
    shelf.innerHTML = ''
    myLibrary.forEach(book => {
        shelf.innerHTML += `
        <div id="${book.getIndex()}" class='book'>
            <button class="remove">X</button>
            <div class="title">${book.title}</div>
            <div class="author">${book.author}</div>
            <div class="pages">Pages: ${book.pages}</div>
            <div class="read">Read? ${readMoji[book.read]}</div>
            <button class="mark-as-read">Mark As Read</button>
        </div>`
    })
    run()
}









function updateCurrentBook() {
    const books = document.querySelectorAll('.book')
    books.forEach(book => book.addEventListener('mouseover', (e) => {
        if(e.target.id) {
            id = e.target.id
            currentBook = myLibrary[id]
            currentBookCard.id = id
            currentBookCard.title = currentBook.title
            currentBookCard.author = currentBook.author
            currentBookCard.pages = currentBook.pages
            currentBookCard.read = currentBook.read 
        }
    }))
}

function removeFunction() {
    const removeBtn = document.querySelectorAll('.remove')

    removeBtn.forEach(remove => remove.addEventListener('click', (e) => {
        myLibrary.splice(currentBookCard.id, 1)
        updateLibrary()
    }))
}

function markAsReadFunction() {
    const markAsReadBtn = document.querySelectorAll('.mark-as-read')

    markAsReadBtn.forEach(a => a.addEventListener('click', (e) => {
        myLibrary[currentBookCard.id].read == 'off'? (myLibrary[currentBookCard.id].read = 'on') : (myLibrary[currentBookCard.id].read = 'off') 
        updateLibrary()
    }))
}

function run() {
    removeFunction()
    markAsReadFunction()
    document.body.onmouseover = updateCurrentBook()
}


// existing books
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '293', 'on')
addBookToLibrary('Harry Potter', 'J.K. Rowling', '293', 'on')
addBookToLibrary('The Peripheral', 'William Gibson', '293', 'on')
addBookToLibrary('Pachinko', 'Min Jin Lee', '293', 'off')
