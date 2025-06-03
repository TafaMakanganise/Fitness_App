document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || !userName) {
        window.location.href = "login.html";
        return;
    }

    // Set username on dashboard
    const usernameElement = document.getElementById("username");
    if (usernameElement) {
        usernameElement.textContent = userName;
    }

    // Logout functionality
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.href = "login.html";
        });
    }
});
