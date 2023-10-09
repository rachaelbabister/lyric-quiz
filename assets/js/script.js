// Variables to call on HTML 
const quizQuestions = document.getElementById('quiz-questions');
const quizOptions = document.getElementById('quiz-options');
const nextQuestion = document.getElementById('next-btn');
const songReveal = document.getElementById('songReveal');

// Shuffle questions before starting the quiz
function startQuiz() {
    shuffleQuiz(askQuiz);
}

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

// Shuffle the questions
function shuffleQuiz(array) {
    for (let i = array.length - i; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display quiz questions
function showQuestion() {
    quizQuestions.innerHTML = '';
    songReveal.innerHTML = '';
    replaceActual();
    let currentQuestion = askQuiz[quizIndex];
    quizQuestions.innerHTML = currentQuestion.question;

    // Quiz options to be put inside a button 
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.option;
        button.classList.add('option-btn');
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
    const chooseOpt = event.target;
    const isRight = chooseOpt.dataset.correct === 'true';
    if (isRight) {
        chooseOpt.classList.add('correct');
        score++;
    } else {
        chooseOpt.classList.add('wrong');
    }
    Array.from(quizOptions.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    // Call showSong to reveal the song
    showSong(askQuiz[quizIndex]);

    nextQuestion.style.display = 'block';
}

// Reveal song name and artist once user has chosen their answer
function showSong(songTitle) {
    const songDiv = document.createElement('div');
    songDiv.innerHTML = `<p>${songTitle.song}</p>`;

    songReveal.innerHTML = '';
    songReveal.appendChild(songDiv);
}

// Show results of quiz 
function showResults() {
    songReveal.innerHTML = '';
    replaceActual();
    quizQuestions.innerHTML = `Well done! </br>You got ${score} out of ${askQuiz.length} questions correct!`;
    nextQuestion.innerHTML = 'Start again';
    nextQuestion.style.display = 'block';
}

// Next button to reveal score once the final question has been answered 
function nextButton() {
    quizIndex++;
    if (quizIndex < askQuiz.length) {
        showQuestion();
    } else {
        showResults();
    }
}

// Event listener to show and hide next button depending on where you are in the game 
nextQuestion.addEventListener('click', () => {
    if (quizIndex < askQuiz.length) {
        nextButton();
    } else {
        startQuiz();
    }
});

startQuiz();