// Validation for sign-up
const submitBtn = document.getElementById('sign-up-submit');
submitBtn.addEventListener('click', (e) => {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    // e.preventDefault();
    console.log(password);
    console.log(confirmPassword);
    if (password !== confirmPassword) {
        console.log('Passwords do not match');
        const error = document.createElement('p');
        error.textContent = 'Passwords do not match';
        document.getElementById('sign-up-form').appendChild(error);
        document.getElementById('password').style.border = '2px red solid';
        document.getElementById('confirm-password').style.border = '2px red solid';
    } else {
        console.log('Passwords do match! Logged in!')   
    }
});