document.addEventListener('DOMContentLoaded', function() {
    // Initialize activity page
    initActivityForm();
    loadActivities();
    setupActivityFilters();
    initActivityCharts();
    
    // Set up event listeners
    setupActivityInteractions();
});

function initActivityForm() {
    // Initialize date picker
    flatpickr("#activityDate", {
        dateFormat: "Y-m-d",
        defaultDate: "today"
    });
    
    // Initialize date range picker
    flatpickr("#activityDateRange", {
        mode: "range",
        dateFormat: "Y-m-d",
        defaultDate: [new Date().setDate(new Date().getDate() - 7), new Date()]
    });
    
    // Handle form toggle
    const addActivityBtn = document.getElementById('addActivityBtn');
    const activityFormContainer = document.getElementById('activityFormContainer');
    const cancelActivityBtn = document.getElementById('cancelActivityBtn');
    
    addActivityBtn.addEventListener('click', function() {
        activityFormContainer.style.display = 'block';
        window.scrollTo({
            top: activityFormContainer.offsetTop - 20,
            behavior: 'smooth'
        });
    });
    
    cancelActivityBtn.addEventListener('click', function() {
        activityFormContainer.style.display = 'none';
    });
    
    // Handle form submission
    const activityForm = document.getElementById('activityForm');
    activityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const activityType = document.getElementById('activityType').value;
        const activityDate = document.getElementById('activityDate').value;
        const activityDuration = document.getElementById('activityDuration').value;
        const activityCalories = document.getElementById('activityCalories').value;
        const activityDistance = document.getElementById('activityDistance').value;
        const activityNotes = document.getElementById('activityNotes').value;
        
        // Validate
        if (!activityType || !activityDate || !activityDuration || !activityCalories) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would save to an API
        alert('Activity logged successfully!');
        
        // Reset form
        activityForm.reset();
        activityFormContainer.style.display = 'none';
        
        // Reload activities
        loadActivities();
    });
}

function loadActivities() {
    // In a real app, this would fetch from an API
    const activities = [
        { 
            id: 1,
            type: 'running', 
            title: 'Morning Run', 
            duration: 28, 
            calories: 320, 
            distance: 3.2, 
            notes: 'Nice morning run along the river. Felt strong today!', 
            date: 'Today', 
            time: '7:30 AM',
            icon: 'fa-running',
            iconClass: 'running'
        },
        { 
            id: 2,
            type: 'weight', 
            title: 'Weight Training', 
            duration: 45, 
            calories: 280, 
            category: 'Upper Body', 
            notes: 'Chest and back workout. Increased weights on bench press.', 
            date: 'Yesterday', 
            time: '6:00 PM',
            icon: 'fa-dumbbell',
            iconClass: 'weight'
        },
        { 
            id: 3,
            type: 'swimming', 
            title: 'Swimming', 
            duration: 40, 
            calories: 350, 
            laps: 30, 
            notes: 'Focus on freestyle technique. Improved my breathing pattern.', 
            date: 'Yesterday', 
            time: '12:00 PM',
            icon: 'fa-swimmer',
            iconClass: 'swimming'
        },
        { 
            id: 4,
            type: 'yoga', 
            title: 'Yoga Session', 
            duration: 60, 
            calories: 220, 
            style: 'Vinyasa Flow', 
            notes: 'Evening yoga to stretch and relax. Focused on hip openers.', 
            date: '2 days ago', 
            time: '7:00 PM',
            icon: 'fa-spa',
            iconClass: 'yoga'
        }
    ];
    
    const activityList = document.getElementById('activityListView');
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon ${activity.iconClass}">
                <i class="fas ${activity.icon}"></i>
            </div>
            <div class="activity-details">
                <h3>${activity.title}</h3>
                <div class="activity-meta">
                    <span><i class="fas fa-clock"></i> ${activity.duration} min</span>
                    <span><i class="fas fa-fire"></i> ${activity.calories} cal</span>
                    ${activity.distance ? `<span><i class="fas fa-route"></i> ${activity.distance} mi</span>` : 
                     activity.category ? `<span><i class="fas fa-dumbbell"></i> ${activity.category}</span>` :
                     activity.style ? `<span><i class="fas fa-heart"></i> ${activity.style}</span>` : ''}
                </div>
                ${activity.notes ? `<p class="activity-notes">${activity.notes}</p>` : ''}
            </div>
            <div class="activity-date">
                <span class="date">${activity.date}</span>
                <span class="time">${activity.time}</span>
                <div class="activity-actions">
                    <button class="action-btn edit" data-id="${activity.id}"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete" data-id="${activity.id}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

function setupActivityFilters() {
    // Handle activity type filter
    document.getElementById('activityTypeFilter').addEventListener('change', function() {
        // In a real app, this would filter activities
        alert('Would filter by ' + this.value);
    });
    
    // Handle date navigation
    document.getElementById('prevDay').addEventListener('click', function() {
        alert('Would show previous day');
    });
    
    document.getElementById('nextDay').addEventListener('click', function() {
        alert('Would show next day');
    });
    
    // Handle view options
    const viewOptions = document.querySelectorAll('.view-option');
    const activityList = document.getElementById('activityListView');
    const activityGrid = document.getElementById('activityGridView');
    
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                activityList.style.display = 'block';
                activityGrid.style.display = 'none';
            } else {
                activityList.style.display = 'none';
                activityGrid.style.display = 'grid';
            }
        });
    });
}

function initActivityCharts() {
    // In a real app, this would initialize actual charts
    document.getElementById('activityTypeChart').innerHTML = '<p class="mock-chart">Activity Type Chart would be displayed here</p>';
    document.getElementById('activityTrendChart').innerHTML = '<p class="mock-chart">Activity Trend Chart would be displayed here</p>';
}

function setupActivityInteractions() {
    // Handle edit/delete buttons (delegated event listeners)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn.edit')) {
            const activityId = e.target.closest('.action-btn').dataset.id;
            editActivity(activityId);
        }
        
        if (e.target.closest('.action-btn.delete')) {
            const activityId = e.target.closest('.action-btn').dataset.id;
            deleteActivity(activityId);
        }
    });
}

function editActivity(id) {
    // In a real app, this would load the activity data into the form
    alert('Would edit activity with ID: ' + id);
    
    // Show the form
    document.getElementById('activityFormContainer').style.display = 'block';
    window.scrollTo({
        top: document.getElementById('activityFormContainer').offsetTop - 20,
        behavior: 'smooth'
    });
}

function deleteActivity(id) {
    if (confirm('Are you sure you want to delete this activity?')) {
        // In a real app, this would delete from an API
        alert('Activity deleted (ID: ' + id + ')');
        loadActivities();
    }
}