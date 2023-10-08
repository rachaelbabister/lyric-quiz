// Variables to call on html 
const quizQuestions = document.getElementById('quiz-questions');
const quizOptions = document.getElementById('quiz-options');
const nextQuestion = document.getElementById('next-btn');

// Variable for questions and score 
let quizIndex = 0;
let score = 0;

// Start the quiz & restart quiz at the end
function startQuiz() {
    quizIndex = 0;
    score = 0;
    nextQuestion.innerHTML = 'Next';
    showQuestion();
}

// Display quiz questions
function showQuestion() {
    replaceActual();
    let currentQuestion = askQuiz[quizIndex];
    quizQuestions.innerHTML = currentQuestion.question;

    // Quiz options to be put inside a button 
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.option;
        button.classList.add(option-btn);
        quizOptions.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', showOptions);
    });
}

// Replace a, b, c with the actual answer options
function replaceActual() {
    nextQuestion.style.display = 'none';
    while (quizOptions.firstChild) {
        quizOptions.removeChild(quizOptions.firstChild);
    }
}

// Choose question options 
function showOptions(event) {
    const option = event.target;
    const isRight = option.dataset.correct === 'true';
    if (isRight) {
        option.classList.add('correct');
        score++;
    } else {
        option.classList.add('wrong');
    }
        Array.from(quizOptions.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        nextQuestion.style.display = 'block';
    }

// Show results of quiz 
function showResults() {
    replaceActual();
    quizQuestions.innerHTML = `Well done! You got ${score} out of ${askQuiz.length} questions correct!`;
    nextQuestion.innerHTML= 'Start again';
    nextQuestion.style.display = 'block';
}

// Next button to reveal score once final question has been answered 
function nextButton() {
    quizIndex++;
    if (quizIndex < askQuiz.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Event listeners 
// Show and hide next button depending on where you are in the game 
nextQuestion.addEventListener('click', () => {
    if (quizIndex < askQuiz.length) {
        nextButton();
    } else {
        startQuiz();
    }

});

startQuiz();
