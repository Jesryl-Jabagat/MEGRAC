
(function() {
    const isLoginPage = window.location.href.includes('logIn.html');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn || isLoginPage) {
        return;
    }

    // If we are in a sub-directory, the path to pages is different.
    const inPagesDirectory = window.location.pathname.includes('/pages/');
    const loginPageUrl = inPagesDirectory ? 'logIn.html' : 'pages/logIn.html';

    window.location.href = loginPageUrl;
})();
