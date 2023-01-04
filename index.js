//Library class

class Library {
    constructor() {}
    
    shelf = document.querySelector('.shelf')

    readMoji = {
        on: '✔️',
        undefined: '🗙',
        off: '🗙',
    }
    myLibrary = []

    currentBookCard = {
        id: '',
        title: '',
        author: '',
        pages: '',
        read: '',
    }

    addBookToLibrary(title, author, pages, read) {
        library.myLibrary.push(new Book(title, author, pages, read))
        this.updateLibrary()
    }

    updateLibrary() {
        this.shelf.innerHTML = ''
        this.myLibrary.forEach(book => {
            this.shelf.innerHTML += `
            <div id="${book.getIndex()}" class='book'>
                <button class="remove">X</button>
                <div class="title">${book.title}</div>
                <div class="author">${book.author}</div>
                <div class="pages">Pages: ${book.pages}</div>
                <div class="read">Read? ${this.readMoji[book.read]}</div>
                <button class="mark-as-read">Mark As Read</button>
            </div>`
        })
        this.run()
    }
    
    updateCurrentBook() {
        const books = document.querySelectorAll('.book')
        books.forEach(book => book.addEventListener('mouseover', (e) => {
            if(e.target.id) {
                this.currentBook = this.myLibrary[e.target.id]
                this.currentBookCard.id = e.target.id
                this.currentBookCard.title = this.currentBook.title
                this.currentBookCard.author = this.currentBook.author
                this.currentBookCard.pages = this.currentBook.pages
                this.currentBookCard.read = this.currentBook.read 
            }
        }))
    }

    removeFunction() {
        const removeBtn = document.querySelectorAll('.remove')
    
        removeBtn.forEach(remove => remove.addEventListener('click', (e) => {
            this.myLibrary.splice(this.currentBookCard.id, 1)
            this.updateLibrary()
        }))
    }

    markAsReadFunction() {
        const markAsReadBtn = document.querySelectorAll('.mark-as-read')
    
        markAsReadBtn.forEach(a => a.addEventListener('click', (e) => {
            this.myLibrary[this.currentBookCard.id].read == 'off'? (this.myLibrary[this.currentBookCard.id].read = 'on') : (this.myLibrary[this.currentBookCard.id].read = 'off') 
            this.updateLibrary()
        }))
    }

    run() {
        this.removeFunction()
        this.markAsReadFunction()
        document.body.onmouseover = this.updateCurrentBook()
    }
}

//Form

class Form {
    constructor () {}

    titleInput = document.querySelector('#title')
    authorInput = document.querySelector('#author')
    pagesInput = document.querySelector('#pages')
    readInput = document.querySelector('#read')
    submitBtn = document.querySelector('.submit-btn')
    closeBtn = document.querySelector('.close-btn')

    

    submitBtnListener = (() => this.submitBtn.addEventListener('click', () => {
        console.log(this.readInput.value)
        console.log('hello')
        library.addBookToLibrary(this.titleInput.value, this.authorInput.value, this.pagesInput.value, this.readInput.value)
        this.clearForm()
    }))()

    readInputListener = (() => this.readInput.addEventListener('click', () => {
        this.readInput.value = this.readInput.value == 'off' ? this.readInput.value = 'on' : this.readInput.value ='off'
    }))()

    
    closeBtnListener = (() => this.closeBtn.addEventListener('click', () => {
        html.newBookFormContainer.classList.remove('active')
        html.overlay.style.display = 'none'
        html.container.style.filter = 'blur(0px)'
    }))()

    
    clearForm() {
        this.titleInput.value = null
        this.authorInput.value = null
        this.pagesInput.value = null
    }
}

//Book

class Book {
    constructor (title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }

    getIndex = () => {
        return library.myLibrary.indexOf(this)
    }

}


//html
class HTML {
    constructor(){}

    newBookBtn = document.querySelector('.new-book-btn')
    newBookFormContainer = document.querySelector('#new-book-form-container')
    container = document.querySelector('#container')
    overlay = document.querySelector('#overlay')

    newBookBtnListener = (() => this.newBookBtn.addEventListener('click', () => {
        this.newBookFormContainer.classList.add('active')
        this.overlay.style.display = 'block'
    }))()
}


//init

const form = new Form()
const library = new Library('zawarudo')
const html = new HTML()

// existing books
library.addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '223', 'on')
library.addBookToLibrary('Harry Potter', 'J.K. Rowling', '345', 'on')
library.addBookToLibrary('The Peripheral', 'William Gibson', '134', 'on')
library.addBookToLibrary('Pachinko', 'Min Jin Lee', '293', 'off')
