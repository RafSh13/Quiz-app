let questions = [];
let currentIndex = 0;
let score = 0;

fetch("/get-questions")
    .then(res => res.json())
    .then(data => {
        questions = data;
        loadQuestion();
    });

function loadQuestion() {
    const q = questions[currentIndex];
    document.getElementById("question-text").textContent = q.question;

    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";

    q.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(btn, q.answer);
        choicesDiv.appendChild(btn);
    });

    document.getElementById("next-btn").disabled = true;
}

function selectAnswer(button, correctAnswer) {
    const buttons = document.querySelectorAll("#choices button");

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    if (button.textContent !== correctAnswer) {
        button.classList.add("wrong");
    } else {
        score++;
    }

    document.getElementById("next-btn").disabled = false;
}

document.getElementById("next-btn").onclick = () => {
    currentIndex++;

    if (currentIndex >= questions.length) {
        showResults();
    } else {
        loadQuestion();
    }
};

function showResults() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    document.getElementById("score-text").textContent =
        `${score} / ${questions.length}`;
}