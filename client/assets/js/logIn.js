// Demo credentials (In production, this should be handled by your backend)
const validCredentials = {
    'admin': 'password123',
    'user': 'user123',
    'manager': 'manager123'
};

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && currentUser) {
        window.location.href="index.html";
    }
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (validCredentials[username] && validCredentials[username] === password) {
        // Successful login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', username);
        window.location.href="index.html";
        errorMessage.style.display = 'none';
    } else {
        // Failed login
        errorMessage.style.display = 'block';
        document.getElementById('password').value = '';
    }
});