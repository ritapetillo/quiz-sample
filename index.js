const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

///////////////////
///VARIABLES SETTINGS
///////////////////

const numberOfQuestions = questions.length;
//this variable track the question we are at and consequentially the page
let q = 0;
//space to appen question
let questionSpace = document.querySelector("#question h3");
//space to store answers
let spaceAnswers = document.getElementById("answers");
//array of answers
let answers = [];
//all elements with selected classes
let selectedItems = document.getElementsByClassName("selected");
//all spans
let allSpans = document.getElementsByTagName("span");
//next button
let nextBtn = document.getElementById("next");
//back button
let backBtn = document.getElementById("back");
//total correct spaceAnswers
let score = 0;
//response bar
let responseBar = document.querySelector(".responses__bar");
//let reload button
let reloadBtn = document.querySelector(".reDo");
//variable to cheeck if quiz started
let startQuiz = false;
//user name
let userName = "";

//I create an array with all the answers so that it's easier to print them on the page
questions.forEach((question) => {
  question.allAnswers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ];
});

//I create an array of correct responses
let correctAnswers = [];
questions.forEach((question) => {
  correctAnswers.push(question.correct_answer);
});

///////////////////
///FUNCTIONS
///////////////////

//function to check if there are other selected answers and if so, remove the selected class
const areThereSelected = () => {
  if (selectedItems) {
    for (let i = 0; i < selectedItems.length; i++) {
      let item = selectedItems[i];

      item.classList.remove("selected");
    }
  }
};

//function to clean the board every time I click on previous or next question
const cleanBoard = () => {
  //remvoe the previous question
  do {
    questionSpace.removeChild(questionSpace.firstChild);
  } while (questionSpace.firstChild);
  //remove the previous answers
  do {
    spaceAnswers.removeChild(spaceAnswers.firstChild);
  } while (spaceAnswers.firstChild);
};

//commin functions to perform when I move to another page by clicking  back or next button

const moveToOtherPage = () => {
  cleanBoard();
  printQuestion();
  checkSelected();
  updateRespBar();
};

//function to submit the quiz
const endTheQuiz = () => {
  let confirmEnd = confirm("Do you want to submit your quiz?");
  if (confirmEnd) {
    verifyResponses();
    displayFinalPage();
    reloadBtn.classList.add("visible");
    reloadBtn.addEventListener("click", () => {
      location.reload();
    });
  }
};
//function to go next
const goNext = () => {
  if (q < 9) {
    q += 1;
    moveToOtherPage();
    backBtn.style.opacity = "100%";
  } else if (q >= 9) {
    endTheQuiz();
  }
};

//function to go back
const goBack = () => {
  if (q > 0) {
    q -= 1;
    moveToOtherPage();
  }
};

//when going next or back I need to check if the user has already given an answer and if that's the case, I need to apply the class selected to that answer
const checkSelected = () => {
  for (let i = 0; i < allSpans.length; i++) {
    if (allSpans[i].innerHTML == answers[q]) {
      allSpans[i].classList.add("selected");
    }
  }
};

const updateRespBar = () => {
  let width = (q / questions.length) * 100;
  responseBar.style.width = `${width}%`;
  console.log(responseBar.style.width);
  console.log(`${width}%`);
};

//function to print every single question with answers. This will be invoked with the next button
const printQuestion = () => {
  if (startQuiz) {
    //insert question in the html question space
    questionSpace.innerHTML = `${q + 1}. ${questions[q].question}`;
    // print answers in the html answers spaceAnswers
    questions[q].allAnswers.forEach((answer) => {
      //create the html
      let newSpan = document.createElement("span");
      newSpan.innerHTML = `${answer}`;

      //append in the answers space
      spaceAnswers.appendChild(newSpan);

      //assigng onclick event when I select the response
      newSpan.addEventListener("click", () => {
        grabResponse(q, answer);
        areThereSelected();
        newSpan.classList.add("selected");
      });
    });
  }
};

//grab the responses
const grabResponse = (q, answer) => {
  answers[q] = answer;
};

const verifyResponses = () => {
  answers.forEach((answer, i) => {
    if (answer == correctAnswers[i]) {
      score++;
    }
  });
  q++;
};

const tryAgain = () => {
  location.reload();
};
const displayFinalPage = () => {
  //check if the user passed the test
  if (score > 5) {
    questionSpace.innerHTML = `Well Done.${userName}!<br><p style="font-size:18px">You scored <em style="color:green">${score}</em> responding correctly to <em style="color:green"> ${
      (score / 10) * 100
    }% </em> of questions</p><span style="font-size:14px"> Check your wrong answers <br> Green: correct answers / Red:wrong asnwers</span>`;
  } else {
    questionSpace.innerHTML = `${userName}, you Failed!<br><p style="font-size:18px">You scored <em style="color:green">${score}</em> responding correctly to only
    <em style="color:green"> ${
      (score / 10) * 100
    }% </em>of questions</p><span style="font-size:14px"> Check your wrong answers<br> Green: correct answers / Red: wrong asnwers</span>`;
  }
  //change the question section with the score

  questionSpace.style.fontSize = "40px";
  questionSpace.style.color = "white";

  //clearthe response section
  do {
    spaceAnswers.removeChild(spaceAnswers.firstChild);
  } while (spaceAnswers.firstChild);

  //disable the next button
  nextBtn.style.display = "none";
  backBtn.style.display = "none";

  //print all the answers
  displayFinalAnswers();
  updateRespBar();
};

const displayFinalAnswers = () => {
  answers.forEach((answer, i) => {
    //create the html
    let newSpan = document.createElement("span");
    newSpan.innerHTML = `${i + 1} ${answer}`;

    if (answer == correctAnswers[i]) {
      newSpan.style.color = "#85ffbd";
    } else {
      newSpan.style.color = "#ff7d3e";
    }
    newSpan.style.fontSize = "25px";

    //append in the answers space
    spaceAnswers.appendChild(newSpan);
  });
};

const yourName = () => {
  questionSpace.innerHTML = `<div style="display:flex; flex-direction:column;aling-items:flex-end; justify-content: center; margin: 0 auto;">Type your Name<br> <input type="text" id="yourNameInput" ><span id="submitName" style="font-size:20px;margin-left:30px">Submit > </span></div>`;

  userName = document.getElementById("yourNameInput").value;

  document.getElementById("submitName").addEventListener("click", () => {
    userName = document.getElementById("yourNameInput").value;

    console.log(userName);
    startQuizFunc();
  });
};
const startQuizFunc = () => {
  startQuiz = true;

  nextBtn.style.opacity = "100%";

  printQuestion();
};
//ON WINDOWS LOAD

window.onload = () => {
  yourName();
  // printQuestion();
  updateRespBar();
  //what happens when I click next or backBtn
  if (q < 1) {
    backBtn.style.opacity = "30%";
  }
  if (!startQuiz) {
    nextBtn.style.opacity = "0%";
    backBtn.style.opacity = "0%";
  }

  backBtn.addEventListener("click", goBack);
  nextBtn.addEventListener("click", goNext);
};
