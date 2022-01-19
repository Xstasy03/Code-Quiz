const startButton = document.getElementById('start-button')
const questionContainerElement = document.getElementById
('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffeledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffeledQuestions = questions.sort(() => Math.random() - .5 )
    questionContainerElement.classList.remove('hide')
    currentQuestionIndex = 0
    setNextQuestion()
}

function setNextQuestion() {
showQuestion(shuffeledQuestions[currentQuestionIndex])
}

function showQuestion(question){
questionElement.innerText = question.question
question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('button')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
})
}

function selectAnswer() {

}

const questions = [
    {
        question: 'Commonly used data types DO NOT include?',
        answers: [
            { text: '1. Strings', correct: true },
            { text: '2. Booleans', correct: false }
        ]
    }
]