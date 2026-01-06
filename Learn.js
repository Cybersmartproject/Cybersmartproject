const passwordInput = document.getElementById('password-input');
const result = document.getElementById('password-result');
const info = document.getElementById('password-info');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;

    if (!password) {
        result.textContent = "";
        info.textContent = "";
        return;
    }

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = "Low";
    let color = "#FF4C4C";
    let explanation = "This password is weak because it lacks a mixture of letters, numbers, and symbols.";

    if (hasLower && hasNumber && hasUpper && hasSymbol) {
        strength = "High";
        color = "#00B894";
        explanation = "Strong password: it includes lowercase and uppercase letters, numbers, and symbols, increasing possible combinations and making it harder to guess.";
    } else if (hasLower && hasNumber && hasUpper) {
        strength = "Medium";
        color = "#FFB400";
        explanation ="Medium strength: it includes lowercase and uppercase letters and numbers, but adding symbols would make it stronger.";
    }

    result.textContent = `Password Strength: ${strength}`;
    result.style.color = color;
    info.textContent = explanation;
});
