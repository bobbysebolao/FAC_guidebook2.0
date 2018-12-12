// Validation for sign-up
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const submitBtn = document.getElementById('sign-up-submit');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        const error = document.createElement('p');
        error.textContent = 'Passwords do not match';
        document.getElementById('sign-up-form').appendChild(error);
        //confirmPassword.setCustomValidity('Passwords do not match');
    } else {
        console.log('Lalala')
    }
});