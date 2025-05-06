const books = [
  {
    id: 1,
    image: "./img_1.jpg",
    title: "Я бачу, вас цікавить пітьма",
    author: "Ілларіон Павлюк",
    genre: "Детектив",
    price: 600,
    status: "Прочитано",
  },
  {
    id: 2,
    image: "./img_2.jpg",
    title: "Іди туди, де страшно. І отримаєш те, про що мрієш",
    author: "Джим Ловлесс",
    genre: "Нон-фікшн",
    price: 280,
    status: "Не прочитано",
  },
  {
    id: 3,
    image: "./img_3.jpg",
    title: "Людина в пошуках справжнього сенсу",
    author: "Віктор Франкл",
    genre: "Нон-фікшн",
    price: 170,
    status: "В процесі",
  },
  {
    id: 4,
    image: "./img_4.jpg",
    title: "Зелене світло",
    author: "Метью Макконагі",
    genre: "Детектив",
    price: 420,
    status: "Не прочитано",
  },
  {
    id: 5,
    image: "./img_5.jpg",
    title: "Кафе на краю світу",
    author: "Джон Стрелекі",
    genre: "Нон-фікшн",
    price: 200,
    status: "В процесі",
  },
  {
    id: 6,
    image: "./img_6.jpg",
    title:
      "Good Vibes, Good Life. Любов до себе — ключ до розкриття вашої величі",
    author: "Векс Кінг",
    genre: "Детектив",
    price: 320,
    status: "Не прочитано",
  },
  {
    id: 7,
    image: "./img_7.jpg",
    title: "Емоційний інтелект",
    author: "Деніел Гоулман",
    genre: "Нон-фікшн",
    price: 420,
    status: "В процесі",
  },
  {
    id: 8,
    image: "./img_8.jpg",
    title: "Танець недоумка",
    author: "Ілларіон Павлюк",
    genre: "Детектив",
    price: 500,
    status: "Прочитано",
  },
];

const booksContainer = document.querySelector(".books");

function renderBooks() {

  booksContainer.innerHTML = "";

  const bookToPaste = books
    .map((book) => {
      let statusClass = "";

      if (book.status === "Не прочитано") {
        statusClass = "not-read";
      } else if (book.status === "В процесі") {
        statusClass = "in-progress";
      } else if (book.status === "Прочитано") {
        statusClass = "read";
      }

      return `
      <div class="book" data-id="${book.id}">
        <div class="image"><img src="${book.image}" alt="book"></div>
        <h2 class="title">${book.title}</h2>
        <p class="author">${book.author}</p>
        <p class="price">${book.price} грн</p>
        <p class="status ${statusClass}">${book.status}</p>
      </div>`;
    }).join("");

  booksContainer.insertAdjacentHTML("afterbegin", bookToPaste);

  const book = document.querySelectorAll(".book");

  book.forEach(card => {
    card.addEventListener("click", () => {
      const bookId = +card.dataset.id;
      const book = books.find(b => b.id == bookId);
      if (book) openModal(book);
    })
  })

}
renderBooks();

function openModal(book) {
  const modal = document.getElementById("modal");
  const modalBody = document.querySelector(".modal-body");

  modalBody.innerHTML = `
    <div class="modal-image"><img src="${book.image}" alt="${book.title}"></div>
    <h2 class="title">${book.title}</h2>
    <p class="author">${book.author}</p>
    <p class="price">${book.price} грн</p>
    <div class="status-btns">
      <button class="status-btn read">Прочитано</button>
      <button class="status-btn in-progress">В процесі</button>
      <button class="status-btn not-read">Не прочитано</button>
    </div>
  `;
  modal.style.display = "flex";
  
  // Блокуємо прокрутку сторінки
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
  
  // Відновлюємо прокрутку
  document.body.style.overflow = "auto";
}

document.querySelector(".close").addEventListener("click", closeModal);

document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") {
    closeModal();
  }
});

function addNewBook() {

  const addBookButton = document.querySelector(".add-book");
  
  addBookButton.addEventListener("click", () => {
  
    console.log("Add book button clicked");
    const addBookModal = document.createElement("div");
    addBookModal.classList.add("add-book-modal");
    addBookModal.innerHTML = `
      <div class="add-book-content">
        <input type="file" accept="image/*" placeholder="Завантажити зображення" class="add-book-image">
        <input type="text" placeholder="Назва" class="add-book-title">
        <input type="text" placeholder="Автор" class="add-book-author">
        <input type="text" placeholder="Жанр" class="add-book-genre">
        <input type="number" placeholder="Ціна" class="add-book-price">
        <button class="add-book-submit">Додати</button>
      </div>
    `;
  
    document.body.appendChild(addBookModal);
    
    addBookModal.addEventListener("click", (e) => {
      if (e.target === addBookModal) {
        addBookModal.classList.add("hidden");
      }
    });
  
    const addBookSubmit = addBookModal.querySelector(".add-book-submit");
    addBookSubmit.addEventListener("click", () => {

      // Тут я вказую, що зображення буде завантажуватись з локального комп'ютера.
      // Якщо зображення не вибрано, то воно не буде відображатись.
      // Мені треба пояснення цього моменту.
      const imageInput = addBookModal.querySelector(".add-book-image");
      const imageFile = imageInput.files[0];
      const imageURL = imageFile ? URL.createObjectURL(imageFile) : "";
      
      books.push({
        id: books.length + 1,
        image: imageURL,
        title: addBookModal.querySelector(".add-book-title").value,
        author: addBookModal.querySelector(".add-book-author").value,
        genre: addBookModal.querySelector(".add-book-genre").value,
        price: addBookModal.querySelector(".add-book-price").value,
        status: "Не прочитано",
      });
      renderBooks();
      addBookModal.classList.add("hidden");
    });
  });
}
addNewBook();