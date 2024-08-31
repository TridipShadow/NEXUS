function toggleForm() {
    document.getElementById('login-form').classList.toggle('hidden');
    document.getElementById('signup-form').classList.toggle('hidden');
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Dummy login check (add your real authentication logic here)
    if (email === 'user@example.com' && password === 'password') {
        alert('Login successful!');
    } else {
        alert('Invalid email or password.');
    }
}

function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Dummy sign-up logic (store credentials and implement your real sign-up logic)
    alert('Sign up successful!');

    // Toggle to login form after sign up
    toggleForm();
}
