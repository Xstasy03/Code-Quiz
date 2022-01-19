let questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answerA: '1. strings',
        answerB: '2. booleans',
        answerC: '3. alerts',
        answerD: '4. numbers',
        correctAnswer: 'c'
    },
    {
        question: 'The condition in an if / else statement is enclosed with _______.',
        answerA: '1. quotes',
        answerB: '2. curly brackets',
        answerC: '3. parenthesis',
        answerD: '4. square brackets',
        correctAnswer: 'c'
    },
    {
        question: 'Arrays in JavaScript can be used to store _______.',
        answerA: '1. numbers and strings',
        answerB: '2. other arrays',
        answerC: '3. booleans',
        answerD: '4. all of the above',
        correctAnswer: 'd'
    },
    {
        question: 'String values must be enclosed within _______ when being assigned to variables.',
        answerA: '1. commas',
        answerB: '2. curly brackets',
        answerC: '3. quotes',
        answerD: '4. parenthesis',
        correctAnswer: 'c'
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answerA: '1. JavaScript',
        answerB: '2. terminal/bash',
        answerC: '3. for loops',
        answerD: '4. console.log',
        correctAnswer: 'd'
    }
];

var quizContent = document.getElementById('quiz-content');
var result = document.getElementById('result');
var endQuiz = document.getElementById('end-quiz');
var finalScore = document.getElementById('finalScore'); 
var btnStartQuiz = document.getElementById('btn-start-quiz');
var homeContent = document.getElementById('home-content');
var question = document.getElementById('question');
var btna = document.getElementById('a');
var btnb = document.getElementById('b');
var btnc = document.getElementById('c');
var btnd = document.getElementById('d');
var progress = document.getElementById('progress');
var correctAlert = document.getElementById('correct');
var wrongAlert = document.getElementById('wrong');
var scoreContainer = document.getElementById('high-scores-page');
var viewHighScores = document.getElementById('btn-high-scores');
var endQuiz = document.getElementById('end-quiz');
var answersId = document.getElementById('answersId');
var questionsAnswers = document.getElementById('questionsAnswers');
var goBack = document.getElementById('btn-go-back');
var clearHighScores = document.getElementById('btn-clear-high-scores');
var submitScore = document.getElementById('submitScore');
var replay = document.getElementById('replay');
var finalScore = document.getElementById('finalScore');
var timer = document.getElementById('timer');
var timerNumber = document.getElementById('timerNumber');
var highscoreDisplayName = document.getElementById('highscore-initials');
var highscoreInputName = document.getElementById('initials');

var timeLeft = 60;
var timeInterval;

let score = 0;
let runningQuestionIndex = 0;
let lastQuestionIndex = questions.length -1;

endQuiz.style.display="none";

function quizQuestions()  {

    let q = questions[runningQuestionIndex];

    question.innerHTML = q.question;
    btna.innerHTML = q.answerA;
    btnb.innerHTML = q.answerB;
    btnc.innerHTML = q.answerC;
    btnd.innerHTML = q.answerD;
};

function renderCounter() {
    if (count <= questionTime) {
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit;
        count++
    } else {
        count = 0;
    }
}

function answerIsCorrect() {
    progress.style.display="block";
    correctAlert.style.display="block";
    wrongAlert.style.display="none";
    score++;
};

function answerIsWrong() {
    progress.style.display="block";
    wrongAlert.style.display="block";
    correctAlert.style.display="none";
    timeLeft -=10;
};

function enterScore() {
    questionsAnswers.style.display="none";
    endQuiz.style.display="block";
    clearInterval(timerInterval);
    timerNumber.textContent = ('Done');
    document.getElementById("finalScore").innerHTML = "Your score is " + score + " points out of 5!";
};

function rightWrong(answer) {
    if (answer == questions[runningQuestionIndex].correctAnswer) {
        answerIsCorrect();

    } else {
        answerIsWrong();
    }

    if (runningQuestionIndex < lastQuestionIndex) {
        runningQuestionIndex++;
        quizQuestions();

    } else {
        enterScore();
    }
};

function startQuiz() {
    homeContent.style.display="none";
    endQuiz.style.display="none";
    quizContent.style.display="block";
    quizQuestions();

    timerInterval = setInterval(function() {
        timeLeft--;
        timerNumber.textContent = timeLeft;

        if (timeLeft === 0 || timeLeft < 0) {
            clearInterval(timerInterval);
            enterScore();
        }
    }, 1000);
};

function clearScores() {
    localStorage.setItem('savedHighscores', JSON.stringify([]));
    scoreRender();
}

function scoreRender() {
    endQuiz.style.display="none";
    homeContent.style.display="none";
    quizContent.style.display="none";
    scoreContainer.style.display="block";
    generateHighscores();
};

function generateHighscores() {
    highscoreDisplayName.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    
    highscores.forEach(function(ele){
        var newLi = document.createElement('li');
        newLi.textContent = ele.name + ' - ' + ele.score;
        highscoreDisplayName.appendChild(newLi);
    });
}

function submitScoreInitial() {

    if (highscoreInputName.value === ""){
        return false;

    } else {
        var savedHighscores = JSON.parse(localStorage.getItem('savedHighscores')) || [];
        var currentUser = highscoreInputName.value;
        var currentHighscore = {
            name: currentUser,
            score: score
        };

        console.log(savedHighscores);

    savedHighscores.push(currentHighscore);
    localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
    generateHighscores();
    
    }
};

function replayQuiz() {
    location.reload(); 
}

function goBackFunction() {
    location.reload();
};

btnStartQuiz.addEventListener("click", startQuiz); 
viewHighScores.addEventListener("click", scoreRender);
goBack.addEventListener("click", goBackFunction);
clearHighScores.addEventListener("click", clearScores);
submitScore.addEventListener("click", submitScoreInitial);
replay.addEventListener("click", replayQuiz);