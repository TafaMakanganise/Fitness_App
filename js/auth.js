document.addEventListener('DOMContentLoaded', function () {
    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
            appId: '2128754130918952',
            cookie: true,
            xfbml: true,
            version: 'v19.0'
        });
    };

    // Load Facebook SDK
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Initialize database
    if (!localStorage.getItem('userDatabase')) {
        localStorage.setItem('userDatabase', JSON.stringify({}));
    }

    // --- SIGNUP ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (!fullname || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            if (password.length < 8) {
                alert('Password must be at least 8 characters');
                return;
            }

            const db = JSON.parse(localStorage.getItem('userDatabase'));
            if (db[email]) {
                alert('Email already registered');
                return;
            }

            db[email] = {
                name: fullname,
                password: password,
                joined: new Date().toISOString()
            };
            localStorage.setItem('userDatabase', JSON.stringify(db));

            // Store login data
            localStorage.setItem('currentUser', JSON.stringify({ email, name: fullname }));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', fullname);
            localStorage.setItem('userEmail', email);

            window.location.href = 'dashboard.html';
        });
    }

    // --- LOGIN ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;

            const db = JSON.parse(localStorage.getItem('userDatabase'));
            const user = db[email];

            if (!user || user.password !== password) {
                alert('Invalid email or password');
                return;
            }

            // Store login data
            localStorage.setItem('currentUser', JSON.stringify({ email, name: user.name }));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', user.name);
            localStorage.setItem('userEmail', email);

            window.location.href = 'dashboard.html';
        });
    }

    // --- FACEBOOK LOGIN ---
    const facebookLogin = document.getElementById('facebookLogin') || document.getElementById('facebookSignup');
    if (facebookLogin) {
        facebookLogin.addEventListener('click', function(e) {
            e.preventDefault();
            
            FB.login(function(response) {
                if (response.authResponse) {
                    // User logged in with Facebook
                    FB.api('/me', {fields: 'name,email'}, function(userInfo) {
                        // Store user data
                        const email = userInfo.email || `${userInfo.id}@facebook.com`;
                        const name = userInfo.name;
                        
                        // Check if user exists in database
                        const db = JSON.parse(localStorage.getItem('userDatabase') || {});
                        
                        if (!db[email]) {
                            // Create new user account if doesn't exist
                            db[email] = {
                                name: name,
                                password: 'facebook', // Special marker for FB users
                                joined: new Date().toISOString(),
                                isFacebookUser: true
                            };
                            localStorage.setItem('userDatabase', JSON.stringify(db));
                        }
                        
                        // Store login data
                        localStorage.setItem('currentUser', JSON.stringify({ email, name }));
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('userName', name);
                        localStorage.setItem('userEmail', email);
                        localStorage.setItem('isFacebookUser', 'true');
                        
                        window.location.href = 'dashboard.html';
                    });
                } else {
                    alert('Facebook login was cancelled or failed');
                }
            }, {scope: 'public_profile,email'});
        });
    }

    const googleLogin = document.getElementById('googleLogin') || document.getElementById('googleSignup');
    if (googleLogin) {
        googleLogin.addEventListener('click', function () {
            alert("Google login is a placeholder and not connected.");
        });
    }

    // --- LOGOUT ---
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            // Check if user is logged in via Facebook
            if (localStorage.getItem('isFacebookUser') === 'true') {
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        FB.logout();
                    }
                    localStorage.clear();
                    window.location.href = 'login.html';
                });
            } else {
                localStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
});