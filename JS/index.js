document.addEventListener("DOMContentLoaded", () => {
  // Получение элементов из DOM
  const questionInput = document.getElementById("question-input");
  const playerInput = document.getElementById("player-input");
  const generateButton = document.getElementById("generate-button");
  const questionIcons = document.getElementById("question-icons");
  const playersContainer = document.getElementById("players");
  const topPlayersList = document.getElementById("top-players-list");
  const titleElement = document.getElementById("title");
  let currentPlayerIndex = 0;

  let currentScore = 0;
  let players = [];
  let isNameEntered = false; // Флаг для отслеживания ввода имени игрока
    // Функция создания иконок игроков
    function createPlayerIcons(numPlayers) {
      for (let i = 1; i <= numPlayers; i++) {
          // Создание объекта игрока
          const player = {
              id: i,
              score: 0,
              name: ""
          };
          players.push(player);
          // Создание элемента игрока в DOM
          const playerElement = document.createElement("div");
          playerElement.classList.add("player");
          playerElement.id = `player${i}`;
          playerElement.innerHTML = `
              <h2><span class="name">Игрок ${i}</span></h2>
              <div class="score">Счет: 0</div>
              <input type="text" class="name-input" placeholder="Введите имя">
              <button class="name-button">Сохранить имя</button>
          `;
          playersContainer.appendChild(playerElement);
          // Получение элементов имени и кнопки из DOM
          const nameInput = playerElement.querySelector(".name-input");
          const nameButton = playerElement.querySelector(".name-button");
            // Обработчик события нажатия на кнопку сохранения имени
          nameButton.addEventListener("click", () => {
              const playerName = nameInput.value.trim();
              if (playerName !== "") {
                  player.name = playerName;
                  const playerNameElement = playerElement.querySelector(".name");
                  playerNameElement.textContent = player.name;

                  // Скрыть поле ввода и кнопку после сохранения имени
                  nameInput.style.display = "none";
                  nameButton.style.display = "none";

                  isNameEntered = true; // Установить флаг, что имя игрока было введено
                  enableQuestionIcons(); // Включить выбор вопросов
              }
          });
      }
    }
    // Массив с вопросами и ответами по географии
    const geographyQuestions = [
      {
        question: "Какая страна является самой большой по территории?",
        answer: "Россия",
      },
      {
        question: "Какое озеро считается самым глубоким в мире?",
        answer: "Озеро Байкал",
      },
      {
        question: "В какой стране находится пирамида Хеопса?",
        answer: "Египет",
      },
      {
        question: "Какая страна располагается на самом высоком плато в мире?",
        answer: "Боливия",
      },
      {
        question: "В каком городе находится Тадж-Махал?",
        answer: "Агра",
      },
      {
        question: "Какая река является самой длинной в Африке?",
        answer: "Нил",
      },
      {
        question: "Какая страна является самой населенной в мире?",
        answer: "Китай",
      },
      {
        question: "В каком государстве находится Сахарская пустыня?",
        answer: "Марокко",
      },
      {
        question: "Какой океан считается самым большим в мире?",
        answer: "Тихий океан",
      },
      {
        question: "В какой стране находится Гранд-Каньон?",
        answer: "США",
      },
      {
        question: "Какая страна является самой малонаселенной в мире?",
        answer: "Ватикан",
      },
      {
        question: "Какая гора является самой высокой в мире?",
        answer: "Эверест",
      },
      {
        question: "В какой стране находится Колизей?",
        answer: "Италия",
      },
      {
        question: "Какая страна располагается на Апеннинском полуострове?",
        answer: "Италия",
      },
      {
        question: "В какой стране находится Айерс-Рок (Улуру)?",
        answer: "Австралия",
      },
      {
        question: "Какая река протекает через Париж?",
        answer: "Сена",
      },
      {
        question: "В какой стране находится Гималаи?",
        answer: "Непал",
      },
      {
        question: "Какое озеро считается самым крупным по площади в Северной Америке?",
        answer: "Озеро Супериор",
      },
      {
        question: "В какой стране находится Мачу-Пикчу?",
        answer: "Перу",
      },
      {
        question: "Какая страна является самой маленькой по площади?",
        answer: "Ватикан",
      },
      // Добавьте другие вопросы по географии с ответами здесь
    ];
     // Функция создания иконок вопросов
    function createQuestionIcons(numQuestions) {
      questionIcons.innerHTML = "";
    
      for (let i = 1; i <= numQuestions; i++) {
        const questionIcon = document.createElement("div");
        questionIcon.classList.add("question-icon");
        questionIcon.dataset.price = i * 100;
    
        const randomIndex = Math.floor(Math.random() * geographyQuestions.length);
        const question = geographyQuestions[randomIndex];
    
        questionIcon.innerHTML = `
          <span class="price">${questionIcon.dataset.price}</span>
        `;
    
        // Добавление вопроса и ответа в объект вопроса
        questionIcon.dataset.question = question.question;
        questionIcon.dataset.answer = question.answer;
    
        // Обработчик события нажатия на иконку вопроса
        questionIcon.addEventListener("click", () => {
          const currentPlayer = players[currentPlayerIndex];
    
          if (!isNameEntered) {
            alert("Пожалуйста, введите свое имя перед выбором вопроса.");
            return;
          }
    
          if (!questionIcon.classList.contains("used")) {
            const price = parseInt(questionIcon.dataset.price);
            currentScore -= price;
            currentPlayer.score += price;
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            updateScores();
            updateTopPlayers();
    
            openModal(`Выбран вопрос на ${price} баллов!`, questionIcon.dataset.question, true);
    
            questionIcon.classList.add("used");
            questionIcon.style.display = "none";
          }
        });
    
        questionIcons.appendChild(questionIcon);
      }
    }
    
    function enableQuestionIcons() {
      const questionIcons = document.querySelectorAll(".question-icon");
      questionIcons.forEach(questionIcon => {
          questionIcon.classList.remove("disabled");
      });
    }


    // Функция выбора вопроса
      

    // Функция открытия модального окна
    function openModal(message, question) {
      const modalElement = document.createElement("div");
      modalElement.classList.add("modal");
      modalElement.innerHTML = `
        <div class="modal-content">
          <span class="close-button">&times;</span>
          <p>${message}</p>
          <div class="question-section">
            <p class="question-text">${question}</p>
          </div>
          <div class="answer-section">
            <input type="text" class="answer-input" placeholder="Введите ответ">
            <div class="button-section">
              <button class="answer-button">Ответить</button>
              <button class="unknown-button">Не знаю</button>
            </div>
          </div>
        </div>
      `;
    
      const closeButton = modalElement.querySelector(".close-button");
      closeButton.addEventListener("click", closeModal);
    
      const questionSection = modalElement.querySelector(".question-section");
      questionSection.classList.add("center"); // Добавляем CSS-класс для выравнивания по центру
    
      const questionText = modalElement.querySelector(".question-text");
      questionText.classList.add("question-text-style"); // Добавляем CSS-класс для стилизации текста вопроса
    
      const answerButton = modalElement.querySelector(".answer-button");
      answerButton.addEventListener("click", handleAnswer);
    
      const unknownButton = modalElement.querySelector(".unknown-button");
      unknownButton.addEventListener("click", handleUnknown);
    
      document.body.appendChild(modalElement);
    }

    // Функция закрытия модального окна
    function closeModal() {
      const modalElement = document.querySelector(".modal");
      modalElement.remove();
      const questionIcon = document.querySelector(".selected");
      questionIcon.style.display = "block";
    }
    



    function handleAnswer() {
      const answerInput = document.querySelector(".answer-input");
      const answer = answerInput.value.trim();
    
      if (answer !== "") {
        const currentPlayer = players[currentPlayerIndex];
        const questionIcon = document.querySelector(".selected");
        const price = parseInt(questionIcon.dataset.price);
    
        currentPlayer.score += price;
        updateScores();
        updateTopPlayers();
        closeModal();
      }
    }
    
    
      
    // Функция обработки нажатия кнопки "Не знаю"
    function handleUnknown() {
      const currentPlayer = players[currentPlayerIndex];
      const questionIcon = document.querySelector(".selected");
      const price = parseInt(questionIcon.dataset.price);

      // Убран блок начисления штрафных баллов при нажатии на кнопку "Не знаю"

      closeModal();
    }

    // Функция проверки имени игрока
    function checkPlayerName() {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.name === "") {
            alert("Пожалуйста, введите свое имя перед выбором вопроса.");
            return false;
        }
        return true;
    }
    // Функция обновления счетов игроков
    function updateScores() {
        players.forEach(player => {
            const playerElement = document.getElementById(`player${player.id}`);
            const playerScoreElement = playerElement.querySelector(".score");
            playerScoreElement.textContent = `Счет: ${player.score}`;
        });
    }
    // Функция обновления списка лучших игроков
    function updateTopPlayers() {
        const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
        topPlayersList.innerHTML = "";
    
        sortedPlayers.forEach((player, index) => {
            const playerElement = document.createElement("div");
            playerElement.classList.add("top-player");
            if (index === 0) {
                playerElement.classList.add("green");
            } else if (index === 1) {
                playerElement.classList.add("yellow");
            } else if (index === 2) {
                playerElement.classList.add("red");
            }
            playerElement.textContent = `${index + 1}. ${player.name} - ${player.score} баллов`;
            topPlayersList.appendChild(playerElement);
        });
    }
    // Функция активации выбора вопросов
    function enableQuestionIcons() {
        const questionIcons = document.querySelectorAll(".question-icon");
        questionIcons.forEach(questionIcon => {
            questionIcon.classList.remove("disabled");
        });
    }
    

    // Функция запуска игры
    function startGame() {
        const numQuestions = parseInt(questionInput.value);
        const numPlayers = parseInt(playerInput.value);
      
        if (isNaN(numQuestions) || numQuestions <= 0 || numQuestions > 20) {
          alert("Введите число от 1 до 20 для количества вопросов.");
          return;
        }
      
        if (isNaN(numPlayers) || numPlayers <= 0 || numPlayers > 5) {
          alert("Введите число от 1 до 5 для количества игроков.");
          return;
        }
      
        createQuestionIcons(numQuestions);
        createPlayerIcons(numPlayers);
      
        questionInput.disabled = true;
        playerInput.disabled = true;
        generateButton.disabled = true;
      
        questionInput.style.display = "none";
        playerInput.style.display = "none";
        generateButton.style.display = "none";
      
        topPlayersList.style.margin = "auto";
        topPlayersList.style.textAlign = "center";
        topPlayersList.style.fontSize = "24px";
        topPlayersList.style.border = "2px solid black";
        topPlayersList.style.outline = "2px solid black";
      
        const firstPlayer = players[0];
        if (firstPlayer.name === "") {
          alert("Пожалуйста, введите свое имя перед началом игры.");
        } else {
          isNameEntered = true;
          enableQuestionIcons();
        }
    }
    // Обработчик события нажатия кнопки "Начать игру"
    generateButton.addEventListener("click", startGame);
    
    // Обработчик события нажатия клавиши Enter в поле ввода количества вопросов
    questionInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
          startGame();
      }
    });
    
});
    

