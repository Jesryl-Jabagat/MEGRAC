// Demo credentials with roles (In production, handle via backend)
const users = {
    'admin':   { password: 'password123', role: 'admin' },
    'user':    { password: 'user123',     role: 'user' },
    'manager': { password: 'manager123',  role: 'manager' }
};

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentUser = sessionStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && currentUser) {
        window.location.href="../index.html";
    }
});

// Login form handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (users[username] && users[username].password === password) {
        // Successful login
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('currentUser', username);
        sessionStorage.setItem('currentRole', users[username].role);
        window.location.href="../index.html";
        errorMessage.style.display = 'none';
    } else {
        // Failed login
        errorMessage.style.display = 'block';
        document.getElementById('password').value = '';
    }
});