document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    loadProfileData();
    setupProfileTabs();
    initProfileCharts();
    setupProfileInteractions();
});

function loadProfileData() {
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
    const avatar = localStorage.getItem('userAvatar');

    document.getElementById('profileName').textContent = userName;
    document.getElementById('profileEmail').textContent = userEmail;

    // Set avatar if saved
    if (avatar) {
        document.getElementById('profileAvatar').src = avatar;
        document.getElementById('userAvatar').src = avatar;
    }

    // Split name into form
    const [firstName, ...lastParts] = userName.split(' ');
    const lastName = lastParts.join(' ');

    document.getElementById('firstName').value = firstName || '';
    document.getElementById('lastName').value = lastName || '';
    document.getElementById('email').value = userEmail;
}

function setupProfileTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const tabId = this.dataset.tab + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function initProfileCharts() {
    document.getElementById('weightChart').innerHTML =
        '<p class="mock-chart">Weight History Chart would be displayed here</p>';
}

function setupProfileInteractions() {
    const avatarUpload = document.getElementById('avatarUpload');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const profileAvatar = document.getElementById('profileAvatar');
    const userAvatar = document.getElementById('userAvatar');

    changeAvatarBtn.addEventListener('click', function () {
        avatarUpload.click();
    });

    avatarUpload.addEventListener('change', function (e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const avatarBase64 = event.target.result;

                // Display and store in localStorage
                profileAvatar.src = avatarBase64;
                userAvatar.src = avatarBase64;
                localStorage.setItem('userAvatar', avatarBase64);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    const personalInfoForm = document.getElementById('personalInfoForm');
    personalInfoForm?.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const birthDate = document.getElementById('birthDate').value;
        const gender = document.getElementById('gender').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const fitnessLevel = document.getElementById('fitnessLevel').value;

        if (!firstName || !lastName || !email || !birthDate || !gender || !height || !weight || !fitnessLevel) {
            alert('Please fill in all required fields');
            return;
        }

        const fullName = `${firstName} ${lastName}`;
        document.getElementById('profileName').textContent = fullName;
        document.getElementById('profileEmail').textContent = email;

        localStorage.setItem('userName', fullName);
        localStorage.setItem('userEmail', email);

        alert('Profile updated successfully!');
    });

    document.getElementById('changePasswordBtn')?.addEventListener('click', function () {
        alert('Change password functionality would be implemented here');
    });

    document.getElementById('connectedAccountsBtn')?.addEventListener('click', function () {
        alert('Connected accounts management would be implemented here');
    });

    document.getElementById('notificationSettingsBtn')?.addEventListener('click', function () {
        alert('Notification settings would be implemented here');
    });

    document.getElementById('activitySharingBtn')?.addEventListener('click', function () {
        alert('Activity sharing settings would be implemented here');
    });

    document.getElementById('deleteAccountBtn')?.addEventListener('click', function () {
        if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('userAvatar');
            window.location.href = 'index.html';
        }
    });

    document.getElementById('exportDataBtn')?.addEventListener('click', function () {
        alert('Data export functionality would be implemented here');
    });
}
