const quizData = [
    {
      question: '우리가 만난 날은 언제일까요 ?',
      options: ['2021.08.03', '2022.08.03', '2021.01.20', '2022.05.02'],
      answer: '2021.08.03',
    },
    {
      question: '상무의 MBTI는 ?',
      options: ['INTP', 'INFP', 'ESTP', 'ESTJ'],
      answer: 'INTP',
    },
    {
      question: '상무가 가장 사랑하는 사람은 ?',
      options: ['김레나', 'RENA', '홍선생의제자', '마리주인님'],
      answer: '김레나',
    },
    {
      question: '상무가 안가본 나라는?',
      options: ['일본', '태국', '뉴질랜드', '대만'],
      answer: '대만',
    },
    {
      question: '상무의 가장 센 욕구는?',
      options: [
        '수면욕',
        '식욕',
        '성욕',
        '모르겟어욕',
      ],
      answer: '식욕',
    },
    {
      question: '상무의 대학교 학과는?',
      options: ['기계공학과', '항공우주학과', '메카트로닉스공학과', '수학과'],
      answer: '메카트로닉스공학과',
    },
    {
      question: '상무의 혈액형은?',
      options: [
        'A',
        'B',
        'O',
        'AB',
      ],
      answer: 'O',
    },
    {
      question: '가장 사랑스러운 사람은 ?',
      options: ['홍창기', '이상무', '오지환', '오스틴'],
      answer: '이상무',
    },
    {
      question: '상무의 키는?',
      options: [
        '190.0',
        '191.1',
        '190.9',
        '191.9',
      ],
      answer: '190.9',
    },
    {
      question: '상무가 가장 좋아하는 안주는 ?',
      options: ['돼지고기', '회', '꼬치', '치킨'],
      answer: '회',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();