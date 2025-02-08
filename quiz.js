 // Quiz Logic with Timer
const quizData = [
    { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
    { question: "Who is the founder of Viral Vault?", options: ["Madhan", "Ravi", "Chandra"], answer: "Chandra" },
    { question: "What is the capital of France?", options: ["Berlin", "Paris", "Madrid"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter"], answer: "Mars" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific"], answer: "Pacific" }
];

let currentQuestion = 0;
let score = 0; // Track score
let timer;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");

function startTimer() {
    let timeLeft = 10;
    timeEl.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            alert("Time's up! The correct answer was: " + quizData[currentQuestion].answer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer); // Clear previous timer
    startTimer(); // Start new timer

    const q = quizData[currentQuestion];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.classList.add("option-btn");
        btn.onclick = () => checkAnswer(opt, btn);
        optionsEl.appendChild(btn);
    });

    nextBtn.style.display = "none"; // Hide next button until answer is selected
}

function checkAnswer(answer, button) {
    clearInterval(timer); // Stop the timer

    const correctAnswer = quizData[currentQuestion].answer;
    const resultMessage = document.createElement("p");

    if (answer === correctAnswer) {
        button.classList.add("correct");
        resultMessage.innerText = "Correct!";
        resultMessage.style.color = "green";
        score++; // Increase score for correct answer
    } else {
        button.classList.add("wrong");
        resultMessage.innerText = "Wrong answer! The correct answer is: " + correctAnswer;
        resultMessage.style.color = "red";
    }

    // Disable all options after answer is selected
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);

    // Show result message below the options
    optionsEl.appendChild(resultMessage);

    nextBtn.style.display = "block"; // Show next button
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

function displayResult() {
    const grade = getGrade(score);
    const message = `Quiz Completed! You scored ${score} out of ${quizData.length}.`;

    questionEl.innerText = message;

    const resultMessage = document.createElement("p");
    resultMessage.innerText = `Your grade: ${grade}`;
    resultMessage.style.color = grade === "A" ? "green" : "red";
    optionsEl.innerHTML = ""; // Clear options
    optionsEl.appendChild(resultMessage);

    nextBtn.style.display = "none"; // Hide the next button
}

// Function to determine grade based on score
function getGrade(score) {
    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        return "A+! Congratulations, you got all answers correct!";
    } else if (percentage >= 90) {
        return "A! Excellent work!";
    } else if (percentage >= 75) {
        return "B! Good job!";
    } else if (percentage >= 50) {
        return "C! Keep trying!";
    } else {
        return "F! Better luck next time!";
    }
}

loadQuestion();
