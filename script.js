const questions= [
    {
        question: "Cabinet declared which day as 'National Space Day' in India?",
        answers: [
            {text: "August 20", correct: "false"},
            {text: "August 23", correct: "true"},
            {text: "August 25", correct: "false"},
            {text: "August 27", correct: "false"},
        ]
    },
    {
        question: "Which racing driver clinched the Dutch Grand Prix for the third year in a row?",
        answers: [
            {text: "Lewis Hamilton", correct:"false"},
            {text: " Max Verstappen", correct:"true"},
            {text: "Charles Leclerc", correct:"false"},
            {text: "Sebastien Vettel", correct:"false"},
        ]
    },
    {
        question: "The world's first hundred percent Ethanol fuelled Car has been developed by which company?",
        answers: [
            {text: "Maruti Suzuki", correct: "false"},
            {text: "Toyota", correct: "true"},
            {text: "Mahindra", correct: "false"},
            {text: "Tata Motors", correct: "false"},
        ]
    },
    {
        question: "NT Rama Rao was the former Chief Minister of which state?",
        answers: [
            {text: "Karnataka", correct: "false"},
            {text: "Andhra Pradesh", correct: "true"},
            {text: "Kerala", correct: "false"},
            {text: "Telangana", correct: "false"},
        ]
    },
    {
        question: "Which cities are the host of India's first two FIFA World Cup 2026 Qualifiers?",
        answers: [
            {text: "Kolkata and Durgapur", correct: "false"},
            {text: "Mysuru and Bengaluru", correct: "false"},
            {text: "Chennai and Puducherry", correct: "false"},
            {text: "Bhubaneswar and Guwahati", correct: "true"},
        ]
    }
];

const questionElement= document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score= 0;

function startQuiz(){
    currentQuestionIndex= 0;
    score= 0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn= e.target;
    const isCorrect= selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score ++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display= "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML= "Play Again";
    nextButton.style.display="block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

