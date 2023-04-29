const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('add-book-modal');

addBookBtn.addEventListener('click', () => {
  addBookModal.style.display = 'block';
});

addBookModal.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read);
  myLibrary.addBook(newBook);
  displayBooks();
  console.log(title, author, pages, read);

  addBookModal.style.display = 'none';
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }
}

const myLibrary = new Library();

function displayBooks() {
  const container = document.querySelector('#book-container');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  for (let i = 0; i < myLibrary.books.length; i++) {
    const book = myLibrary.books[i];
    const card = document.createElement('div');
    card.classList.add('book-card');

    const title = document.createElement('h2');
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement('p');
    author.textContent = `Author: ${book.author}`;
    card.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = `Pages: ${book.pages}`;
    card.appendChild(pages);

    const read = document.createElement('p');
    read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
    card.appendChild(read);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
      myLibrary.removeBook(i);
      displayBooks();
    });
    card.appendChild(deleteButton);

    const readButton = document.createElement('button');
    readButton.textContent = 'Change Status';
    readButton.classList.add('read');
    readButton.addEventListener('click', () => {
      book.toggleReadStatus();
      displayBooks();
    });
    card.appendChild(readButton);

    container.appendChild(card);
  }
}