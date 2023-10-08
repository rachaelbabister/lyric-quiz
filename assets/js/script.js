/* Variables to call on html */
const quizQuestions = document.getElementById('quiz-questions');
const quizOptions = document.getElementById('quiz-options');
const nextQuestion = document.getElementById('next-btn');

/* Start the quiz & restart quiz at the end*/
function startQuiz() {
    quizIndex = 0;
    score = 0;
    next-btn.innerHTML = 'Next';
    loadQuestion();
}

/* Display quiz questions */
function showQuestion() {
    let currentQuestion = askQuiz[quizIndex];
    quizQuestions.innerHTML = currentQuestion.question;
}

/* Choose question options */
function showOptions(event) {
    const option = event.target;
    const isRight = option.dataset.correct === 'true';
    if (isRight) {
        option.classList.add('correct');
        score++
    } else {
        option.classList.add('wrong')
    }
        Array.from(quizOptions.children).forEach(button => {
            if (button.dataset.correct === 'true') {
                button.classList.add('correct');
            }
            button.disabled = true;
        });
        nextQuestion.style.display = 'block';
    }

/* Show results of quiz */
function showResults() {
    quizQuestions.innerHTML = `Well done! You got ${score} out of ${askQuiz.length} questions correct!`;
    nextQuestion.style.display = 'block';
}

/* Next button to reveal score once final question has been answered */
function nextButton() {
    quizIndex++;
    if (quizIndex < askQuiz.length) {
        showQuestion();
    } else {
        showResults();
    }
}

/* Event listeners */
/* Show and hide next button depending on where you are in the game */
nextQuestion.addEventListener('click', () => {
    if (quizIndex < askQuiz.length) {
        nextButton();
    } else {
        startQuiz();
    }

});

startQuiz();
