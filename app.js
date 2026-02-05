// Fetch questions and populate topic dropdown
let allQuestions = [];

fetch('data/questions.json')
    .then(response => response.json())
    .then(data => {
        allQuestions = data;
        populateTopics();
    })
    .catch(error => console.error('Error loading questions:', error));

function populateTopics() {
    const topicSelect = document.getElementById('topicSelect');
    const topics = [...new Set(allQuestions.map(q => q.topic))]; // unique topics

    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });

    topicSelect.addEventListener('change', () => {
        startQuiz(topicSelect.value);
    });
}

let currentQuestions = [];
let currentIndex = 0;

function startQuiz(topic) {
    currentQuestions = allQuestions.filter(q => q.topic === topic);
    currentIndex = 0;
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quizContainer');
    const questionText = document.getElementById('questionText');
    const optionsList = document.getElementById('optionsList');
    const feedback = document.getElementById('feedback');

    feedback.textContent = ''; // clear previous feedback

    if (currentIndex >= currentQuestions.length) {
        questionText.textContent = "Quiz finished!";
        optionsList.innerHTML = '';
        return;
    }

    const q = currentQuestions[currentIndex];
    questionText.textContent = q.question;
    optionsList.innerHTML = '';

    q.options.forEach((option, idx) => {
        const li = document.createElement('li');
        li.textContent = option;
        li.style.cursor = 'pointer';
        li.addEventListener('click', () => checkAnswer(idx));
        optionsList.appendChild(li);
    });
}

function checkAnswer(selectedIndex) {
    const q = currentQuestions[currentIndex];
    const feedback = document.getElementById('feedback');

    if (selectedIndex === q.answerIndex) {
        feedback.textContent = "✅ Correct! " + q.explanation;
    } else {
        feedback.textContent = "❌ Wrong! " + q.explanation;
    }

    currentIndex++;
    setTimeout(showQuestion, 1500); // show next question after 1.5 sec
}