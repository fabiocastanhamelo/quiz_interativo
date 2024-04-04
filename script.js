const questions = [
    {
        question: ["Qual é o primeiro livro do Novo Testamento?"],
        choices: ["Josué", "Rute", "Jonas", "Mateus"],
        answer: "Mateus",
    },
    {
        question: ["Quem escreveu a carta aos Romanos?"],
        choices: ["Pedro", "João", "Paulo", "Silas"],
        answer: "Paulo",
    },
    {
        question: ["Quantos capítulos tem a carta aos Romanos?"],
        choices: ["Dezesseis", "Treze", "Nove", "Cinco"],
        answer: "Dezesseis",
    },
    {
        question: ["Quantos capítulos tem o livro dos Salmos?"],
        choices: ["135", "157", "150", "148"],
        answer: "150",
    },
    {
        question: ["Qual livro do Antigo Testamento tem somente um capítulo?"],
        choices: ["Jonas", "Obadias", "Naum", "Habacuque"],
        answer: "Obadias",
    }
];

const questionElement = document.querySelector("#question");
const choiceElements = document.querySelectorAll(".choice");
const nextButton = document.querySelector("#next");
const scoreElement = document.querySelector("#score");
const wrongElement = document.querySelector("#wrong");

let currentQuestion = 0;
let score = 0;
let wrong = 0;
let answerChosen = false;

function loadQuestion() {
    const currentQuestionData = questions[currentQuestion]
    questionElement.innerText = currentQuestionData.question;

    const choices = shuffleArray(currentQuestionData.choices);

    for(let i = 0; i < choiceElements.length; i++) {
        choiceElements[i].innerText = choices[i]
    }

    answerChosen = false;
}

function shuffleArray(array) {
    let currentIndex = array.length
    let temporaryValue;
    let randomIndex;

    while(0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function checkAnswer(e) {

    if (answerChosen) return;

    answerChosen = true;

    if(e.target.innerText === questions[currentQuestion].answer) {
        score++;
        scoreElement.innerText = `Pontuação: ${score}`;
        alert("Correto!")
    } else {
        wrong++;
        wrongElement.innerText = `Erros: ${wrong}`;
        alert(`Resposta errada. O correto é: ${questions[currentQuestion].answer}`)
    }
}

choiceElements.forEach((btn) => {
    btn.addEventListener("click", checkAnswer);
});

nextButton.addEventListener("click", () => {
    if(!answerChosen) {
        alert("Por favor, responda a pergunta para avançar!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
        alert(`FIM! Você respondeu a ${questions.length} perguntas e acertou ${score}.`);
        restartQuiz();
    }
});

function restartQuiz () {
    currentQuestion = 0;
    score = 0;
    wrong = 0;
    scoreElement.innerText = 'Pontuação: 0';
    wrongElement.innerText = 'Erros: 0';
    loadQuestion();
}

loadQuestion()