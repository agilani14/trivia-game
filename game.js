const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "What animal has the thickest fur of any mammal?",
    choice1: "sea otter",
    choice2: "dogs",
    choice3: "squirrels",
    choice4: "bears",
    answer: 1
  },
  {
    question:
      "What animal has the highest blood pressure?",
    choice1: "me",
    choice2: "bears",
    choice3: "giraffe",
    choice4: "cats",
    answer: 3
  },
  {
    question: "The age of a lion can be determined by its...?",
    choice1: "whiskers",
    choice2: "lions mane",
    choice3: "weight",
    choice4: "nose",
    answer: 4
  },
  {
    question: "What is the deadliest creature in the world?",
    choice1: "shark",
    choice2: "mosquito",
    choice3: "deers",
    choice4: "bees",
    answer: 2
  },
  {
    question: "What is a polar bears skin color?",
    choice1: "black",
    choice2: "white",
    choice3: "brown",
    choice4: "all the colors of the rainbow",
    answer: 1
  }
]


//constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  //console.log(availableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;


  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });


  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);


    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);




  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


startGame();
