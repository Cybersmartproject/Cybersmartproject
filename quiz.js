const quizSection = document.getElementById('quiz-section');
const submitButton = document.getElementById('submit-quiz');
const restartButton = document.getElementById('restart-quiz');
const scoreDisplay = document.getElementById('quiz-score');

let quizAttempt = 0;

// Quiz Sets
const quizSet1 = [
    {q:"What is the most secure type of password?", a:["b"], options:["Your pet's name","A mix of lowercase, uppercase, numbers, and symbols","123456"]},
    {q:"How should you handle an email from an unknown sender asking for sensitive info?", a:["c"], options:["Reply immediately","Click links","Ignore or report"]},
    {q:"Which of the following help make your password stronger?", a:["a","c"], options:["Adding symbols","Using your name","Using uppercase letters","Using 1234"]},
    {q:"What is two-factor authentication?", a:["b"], options:["Using same password twice","Extra verification like sending a code to your phone number","Sharing passwords"]},
    {q:"Which actions improve social media safety?", a:["a","c"], options:["Enable privacy settings","Accept all friend requests","Think before posting","Share location in posts"]},
    {q:"What are signs of phishing emails?", a:["b","d"], options:["Email from friend you know","Spelling mistakes/suspicious links","No subject line","Urgent requests for personal info"]},
    {q:"Which protect your device security?", a:["a","c"], options:["Install antivirus software","Click unknown links","Keep system updated","Download from random websites"]},
    {q:"Best way to manage multiple complex passwords?", a:["b"], options:["Write on paper","Use a password manager","Same password everywhere"]},
    {q:"What should you do before clicking a link online?", a:["c"], options:["Ignore URL","Trust without checking","Hover to inspect","Click fast"]},
    {q:"What increases password complexity?", a:["a","b","c","d"], options:["Adding symbols","Using uppercase","Using numbers","Using lowercase"]}
];

const quizSet2 = [
    {q:"Which is safest on public Wi-Fi?", a:["b"], options:["Access banking without VPN","Use VPN","Disable firewall"]},
    {q:"How to verify a website is secure?", a:["c"], options:["Check design","Check images","Look for HTTPS and lock icon"]},
    {q:"Signs of a scam message?", a:["a","d"], options:["Unexpected prize","Typos","Regular sender","Urgent personal info request"]},
    {q:"What helps protect personal info?", a:["b","c"], options:["Share only with friends","Use strong passwords","Review privacy settings","Share birthdate publicly"]},
    {q:"Strong password example?", a:["c"], options:["12345678","password","A!b9kL$3z"]},
    {q:"What is phishing?", a:["b"], options:["Software update","Fake emails/messages to steal info","Secure network"]},
    {q:"Why update devices?", a:["a","b"], options:["Fix vulnerabilities","Protect from malware","Just aesthetics"]},
    {q:"Which is safe on social media?", a:["a","c"], options:["Enable privacy settings","Post personal data","Think before posting","Share password"]},
    {q:"How to spot fake link?", a:["b"], options:["Click it immediately","Hover to see real URL","Trust shortened URL"]},
    {q:"What to do if hacked?", a:["a","b"], options:["Change passwords","Enable 2FA","Ignore it","Share passwords"]},
];
    
let currentQuiz = [];

function loadQuiz() {
    quizSection.innerHTML = '';
    currentQuiz.forEach((qObj,index) => {
        const div = document.createElement('div');
        div.classList.add('quiz-question');
        div.dataset.answer = qObj.a.join(',');

        let optionsHtml = '';
        const type = qObj.a.length > 1 ? 'checkbox' : 'radio';
        qObj.options.forEach((opt,optIndex) => {
            optionsHtml += `<li><label><input type="${type}" name="q${index}" value="${String.fromCharCode(97+optIndex)}"> ${opt}</label></li>`;
        });

        div.innerHTML = `<h3>${index+1}. ${qObj.q}</h3><ul>${optionsHtml}</ul><p class="quiz-result"></p>`;
        quizSection.appendChild(div);
    });
    scoreDisplay.textContent = '';
}

function calculateScore() {
    let score = 0;
    const questions = document.querySelectorAll('.quiz-question');

    questions.forEach(q => {
        const type = q.querySelector('input').type;
        const correctAnswer = q.dataset.answer.split(',');
        let userAnswer = [];

        if(type==='radio'){
            const selected = q.querySelector('input[type="radio"]:checked');
            if(selected) userAnswer.push(selected.value);
        } else {
            q.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => userAnswer.push(cb.value));
        }

        if(userAnswer.length === correctAnswer.length && userAnswer.every(val => correctAnswer.includes(val))){
            q.querySelector('.quiz-result').textContent = '✅ Correct';
            q.querySelector('.quiz-result').style.color = '#00B894';
            score++;
        } else if(userAnswer.length>0){
            q.querySelector('.quiz-result').textContent = '❌ Incorrect';
            q.querySelector('.quiz-result').style.color = '#FF4C4C';
        } else {
            q.querySelector('.quiz-result').textContent = '';
        }
    });

    const total = questions.length;
    const percent = Math.round((score/total)*100);
    let feedback = '';

    if(percent <=30) feedback="Your cybersecurity knowledge needs improvement. Review the Learn page and try again!";
    else if(percent<=60) feedback="You’re getting there! Keep learning to strengthen your online safety skills.";
    else if(percent<=90) feedback="Great job! You know a lot about staying safe online.";
    else feedback="Excellent! You’re a cybersecurity expert!";

    scoreDisplay.textContent = `Score: ${percent}% - ${feedback}`;
}

let showingSet1 = true; // keeps track of which quiz set is currently showing

function restartQuiz() {
    // Toggle the quiz set
    if (showingSet1) {
        currentQuiz = quizSet2;
    } else {
        currentQuiz = quizSet1;
    }

    showingSet1 = !showingSet1; // flip the flag
    loadQuiz();
}



submitButton.addEventListener('click', calculateScore);
restartButton.addEventListener('click', restartQuiz);

// Initialize first quiz
currentQuiz = quizSet1;
loadQuiz();
