const questionForm = document.querySelector('.question-form');
const formControl = document.querySelector('.form-control');
let answerOptions;

const questionCollection = [
  {
    question: 'What is the correct format for creating a closure?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 'C'
  },
  {
    question: 'What is JavaScript?',
    options: ['A', 'B', 'C', 'D', 'E'],
    correctAnswer: 'B'
  }
];
let activeIndex = 0;

function renderQuestionAndAnswers() {
  const activeQuestion = questionCollection[activeIndex];
  let template = '';

  template += `
    <p>${activeIndex + 1}. ${activeQuestion.question}</p>

    ${activeQuestion.options
      .map(
        option => `
      <label>
        <input type="radio" name="answer" value="${option}" class="${
          activeQuestion.correctAnswer === option ? 'correct' : ''
        }" />
        Option ${option}
      </label>
    `
      )
      .join('')}
  `;

  formControl.innerHTML = template;

  // add event listener to inputs
  answerOptions = document.querySelectorAll('input[name=answer]');

  addEventListenerToInput();
}

function addEventListenerToInput() {
  const correctAnswer = document.querySelector('.correct');

  answerOptions.forEach(inputOption => {
    inputOption.addEventListener('change', e => {
      const selectedAnswer = e.target.value;

      if (selectedAnswer == correctAnswer.value) {
        inputOption.parentElement.classList.add('success');
      } else {
        inputOption.parentElement.classList.add('danger');
        correctAnswer.parentElement.classList.add('success');
      }

      // disable input selection
      disableInputSelection();
    });
  });
}

function disableInputSelection() {
  answerOptions.forEach(input => input.setAttribute('disabled', true));
}

questionForm.addEventListener('submit', e => {
  e.preventDefault();

  activeIndex += 1;

  if (activeIndex < questionCollection.length) {
    renderQuestionAndAnswers();
  } else {
    alert('Quiz completed!!! Your score is bla bla bla!!!');
    location.href = 'index.html';
  }
});

// setup quiz view
renderQuestionAndAnswers();
