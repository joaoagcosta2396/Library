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

  const newBook = new Book (title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
  console.log(title, author, pages, read);

  addBookModal.style.display = 'none';
  
  
});

let myLibrary = [];

function Book (title, author, pages, read){

  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function displayBooks(){
  const container = document.querySelector('#book-container');

  while(container.firstChild){
    container.removeChild(container.firstChild);
  }

  for(let i = 0 ; i < myLibrary.length; i++){
    const book = myLibrary[i];
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
      removeBook(i);
      displayBooks();
    });
    card.appendChild(deleteButton);

    const readButton = document.createElement('button');
    readButton.textContent = 'Change Status';
    readButton.classList.add('read');
    readButton.addEventListener('click', () => {
      book.read = !book.read;
      displayBooks();
    });
    card.appendChild(readButton);

    container.appendChild(card);
    
  }
}

function removeBook(index) {
  myLibrary.splice(index, 1);
}
