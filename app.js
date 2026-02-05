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