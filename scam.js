const emailContainer = document.getElementById('email-container');
const scamBtn = document.getElementById('scam-btn');
const legitBtn = document.getElementById('legit-btn');
const resetBtn = document.getElementById('reset-btn');
const scoreDisplay = document.getElementById('score-display');
const explanation = document.getElementById('explanation');

let score = 0;
let index = 0;
let answered = false; // to prevent multiple clicks

// === Email Scenarios ===
const emails = [
  {
    type: 'scam',
    html: `
      <div class="fake-email">
        <div class="email-header">
          <p><strong>From:</strong> support@paypa1-security.com</p>
          <p><strong>Subject:</strong> Urgent: Account Suspended</p>
        </div>
        <div class="email-body">
          <p>Hello,</p>
          <p>We noticed suspicious activity in your account. Please click the link below to restore access immediately.</p>
          <p><a href="#">Restore Account</a></p>
          <p>PayPal Support</p>
        </div>
      </div>`,
    explanation: "🚨 Scam! The sender’s domain is fake (‘paypa1’ instead of ‘paypal’), and it uses fear and urgency."
  },
  {
    type: 'legit',
    html: `
      <div class="fake-email">
        <div class="email-header">
          <p><strong>From:</strong> service@paypal.com</p>
          <p><strong>Subject:</strong> Your Monthly Statement is Ready</p>
        </div>
        <div class="email-body">
          <p>Dear User,</p>
          <p>Your monthly statement is ready. Please log in through your PayPal account to review your activity.</p>
          <p><a href="https://www.paypal.com">Go to PayPal</a></p>
          <p>Thanks for choosing PayPal.</p>
        </div>
      </div>`,
    explanation: "✅ Legitimate! The sender domain is official, tone is calm, and the link goes to PayPal’s real site."
  },
  {
    type: 'scam',
    html: `
      <div class="fake-email">
        <div class="email-header">
          <p><strong>From:</strong> deals@amaz0n-giftcards.com</p>
          <p><strong>Subject:</strong> Congratulations! You won a free $500 gift card!</p>
        </div>
        <div class="email-body">
          <p>Click below to claim your reward within the next 2 hours!</p>
          <p><a href="#">Claim Now</a></p>
        </div>
      </div>`,
    explanation: "🚨 Scam! The fake domain (‘amaz0n’), urgency, and unrealistic reward are all classic signs."
  },
  {
    type: 'legit',
    html: `
      <div class="fake-email">
        <div class="email-header">
          <p><strong>From:</strong> orders@amazon.com</p>
          <p><strong>Subject:</strong> Your order has shipped</p>
        </div>
        <div class="email-body">
          <p>Hello Faisal,</p>
          <p>Your package is on the way! You can track it from your Amazon account.</p>
        </div>
      </div>`,
    explanation: "✅ Legitimate. Real domain, no links requesting personal info, and relevant order details."
  },
  {
    type: 'scam',
    html: `
      <div class="fake-email">
        <div class="email-header">
          <p><strong>From:</strong> rewards@lottery-gov.com</p>
          <p><strong>Subject:</strong> You’re our lucky winner!</p>
        </div>
        <div class="email-body">
          <p>You’ve won $1,000,000! Send your bank details to claim your prize immediately.</p>
        </div>
      </div>`,
    explanation: "🚨 Scam! Government lotteries never email people about prizes, and asking for bank details is a red flag."
  },
  {
    type: 'legit',
    html: `
      <div class="fake-email">
        <div class="email-header">
          <p><strong>From:</strong> info@school.edu</p>
          <p><strong>Subject:</strong> School Newsletter - January Events</p>
        </div>
        <div class="email-body">
          <p>Hi students and parents,</p>
          <p>Check our school’s official website for next month’s activities and forms.</p>
        </div>
      </div>`,
    explanation: "✅ Legitimate. Official domain, professional tone, and no request for sensitive data."
  }
];

// === Functions ===
function loadEmail() {
  answered = false;
  explanation.textContent = '';
  emailContainer.innerHTML = emails[index].html;
  // make sure choice buttons are enabled
  scamBtn.disabled = false;
  legitBtn.disabled = false;
  scamBtn.style.opacity = '1';
  legitBtn.style.opacity = '1';
  // show buttons if hidden
  scamBtn.style.display = 'inline-block';
  legitBtn.style.display = 'inline-block';
}

function handleChoice(choice) {
  if (answered) return; // prevent multiple clicks
  answered = true;

  const current = emails[index];
  const isCorrect = (choice === current.type);

  if (isCorrect) {
    score++;
    explanation.textContent = `✅ Correct! ${current.explanation}`;
    explanation.style.color = "#00B894";
  } else {
    explanation.textContent = `❌ Incorrect. ${current.explanation}`;
    explanation.style.color = "#FF4C4C";
  }

  scoreDisplay.textContent = `Score: ${score}`;

  // disable buttons after answer
  scamBtn.disabled = true;
  legitBtn.disabled = true;
  scamBtn.style.opacity = '0.5';
  legitBtn.style.opacity = '0.5';

  // auto move to next question after 1.2 seconds
  setTimeout(() => {
    if (index < emails.length - 1) {
      index++;
      loadEmail();
    } else {
      showFinalScore();
    }
  }, 4000);
}

function showFinalScore() {
  emailContainer.innerHTML = `<p style="text-align:center;font-size:1.2rem;">
    You've finished all emails!<br>
    <strong>Final Score:</strong> ${score} / ${emails.length}
  </p>`;
  scamBtn.style.display = 'none';
  legitBtn.style.display = 'none';

  // final explanation message
  explanation.textContent = getScoreMessage(score, emails.length);
  const percent = (score / emails.length) * 100;
  if (percent >= 80) {
    explanation.style.color = "#00B894"; // green
  } else if (percent >= 50) {
    explanation.style.color = "#FFD700"; // yellow
  } else {
    explanation.style.color = "#FF4C4C"; // red
  }
}

function getScoreMessage(score, total) {
  const percent = (score / total) * 100;
  if (percent >= 80) {
    return "Excellent! You can confidently spot scams online.";
  } else if (percent >= 50) {
    return "Not bad! Review the emails and try again to improve.";
  } else {
    return "Low score. Review the learn section and try again!";
  }
}

function resetGame() {
  score = 0;
  index = 0;
  scoreDisplay.textContent = 'Score: 0';
  loadEmail();
  explanation.textContent = '';
}

// === Event Listeners ===
scamBtn.addEventListener('click', () => handleChoice('scam'));
legitBtn.addEventListener('click', () => handleChoice('legit'));
resetBtn.addEventListener('click', resetGame);

// Load first email
loadEmail();
