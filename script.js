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

const bookToPaste = books.map((book) => {
  let statusClass = "";

  if (book.status === "Не прочитано") {
    statusClass = "not-read";
  } else if (book.status === "В процесі") {
    statusClass = "in-progress";
  } else if (book.status === "Прочитано") {
    statusClass = "read";
  }

  return `<div class="book">
  <div class="image"><img src="${book.image}" alt="book"></div>
  <h2 class="title">${book.title}</h2>
  <p class="author">${book.author}</p>
  <p class="price">${book.price} грн</p>
  <p class="status ${statusClass}">${book.status}</p>
</div>`;
}).join("");

const bookContainer = document.querySelector(".books");

bookContainer.insertAdjacentHTML("afterbegin", bookToPaste);

const book = document.querySelectorAll(".book");

const originalBookStatus = document.querySelector(".status");

book.forEach((item) => {
  item.addEventListener("click", () => {
    
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const clone = item.cloneNode(true);
    clone.classList.add("modal-card");

    const clonedStatus = clone.querySelector(".status");
    clonedStatus.remove();

    const clonedStatusBtns = document.createElement("div");
    clonedStatusBtns.classList.add("status-btns");
    const statusRead = document.createElement("button");
    statusRead.classList.add("status-btn", "read");
    statusRead.innerText = "Прочитано";
    const statusInProgress = document.createElement("button");
    statusInProgress.classList.add("status-btn", "in-progress");
    statusInProgress.innerText = "В процесі";
    const statusNotRead = document.createElement("button");
    statusNotRead.classList.add("status-btn", "not-read");
    statusNotRead.innerText = "Не прочитано";
    clonedStatusBtns.appendChild(statusRead);
    clonedStatusBtns.appendChild(statusInProgress);
    clonedStatusBtns.appendChild(statusNotRead);


    // Тут я додав слухачі на всі кнопки статусу в модалці. Чомусь через clonedStatusBtns.forEach не спрацьовує. 
    // Тому я вирішив зробити так.
    // І ще не виходить змінити статус на той, який я натискаю.
    // Можливо, через те, що я не можу дістатися до самого статусу в модалці?
    // Якщо я правильно зрозумів, то потрібно дістатися до статусу в модалці і змінити його на той, який я натискаю.
    statusRead.addEventListener("click", (e) => {
      if (e.target === statusRead) {
        modal.classList.add("hidden")
      }
    });

    statusInProgress.addEventListener("click", (e) => {
      if (e.target === statusInProgress) {
        modal.classList.add("hidden")
      }
    });

    statusNotRead.addEventListener("click", (e) => {
      if (e.target === statusNotRead) {
        modal.classList.add("hidden")
      }
    });

    clone.appendChild(clonedStatusBtns);

    modal.appendChild(clone);
    
    document.body.appendChild(modal);

    // Kод для закриття модалки
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden")
      }
    })
  });
});