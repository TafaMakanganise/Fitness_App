document.addEventListener('DOMContentLoaded', function() {
    // Initialize goals page
    initGoalForm();
    loadGoals();
    initGoalsCharts();
    
    // Set up event listeners
    setupGoalsInteractions();
});

function initGoalForm() {
    // Handle form toggle
    const addGoalBtn = document.getElementById('addGoalBtn');
    const goalFormContainer = document.getElementById('goalFormContainer');
    const cancelGoalBtn = document.getElementById('cancelGoalBtn');
    const closeGoalForm = document.getElementById('closeGoalForm');
    
    addGoalBtn.addEventListener('click', function() {
        goalFormContainer.style.display = 'block';
        window.scrollTo({
            top: goalFormContainer.offsetTop - 20,
            behavior: 'smooth'
        });
    });
    
    cancelGoalBtn.addEventListener('click', function() {
        goalFormContainer.style.display = 'none';
    });
    
    closeGoalForm.addEventListener('click', function() {
        goalFormContainer.style.display = 'none';
    });
    
    // Handle form submission
    const goalForm = document.getElementById('goalForm');
    goalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const goalTitle = document.getElementById('goalTitle').value;
        const goalCategory = document.getElementById('goalCategory').value;
        const goalTarget = document.getElementById('goalTarget').value;
        const goalDeadline = document.getElementById('goalDeadline').value;
        const goalDescription = document.getElementById('goalDescription').value;
        
        // Validate
        if (!goalTitle || !goalCategory || !goalTarget || !goalDeadline) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would save to an API
        alert('Goal created successfully!');
        
        // Reset form
        goalForm.reset();
        goalFormContainer.style.display = 'none';
        
        // Reload goals
        loadGoals();
    });
}

function loadGoals() {
    // In a real app, this would fetch from an API
    const goals = [
        { 
            id: 1,
            title: 'Weight Loss', 
            category: 'weight', 
            current: 165, 
            target: 150, 
            unit: 'lbs', 
            description: 'Lose 15 lbs to reach target weight', 
            progress: 53 
        },
        { 
            id: 2,
            title: 'Weekly Workouts', 
            category: 'activity', 
            current: 4, 
            target: 5, 
            unit: 'workouts', 
            description: 'Complete 5 workouts per week', 
            progress: 80 
        },
        { 
            id: 3,
            title: 'Daily Steps', 
            category: 'activity', 
            current: 8742, 
            target: 12000, 
            unit: 'steps', 
            description: 'Average 12,000 steps per day', 
            progress: 73 
        },
        { 
            id: 4,
            title: 'Protein Intake', 
            category: 'nutrition', 
            current: 120, 
            target: 150, 
            unit: 'g', 
            description: 'Consume 150g protein daily', 
            progress: 80 
        }
    ];
    
    const completedGoals = [
        { 
            id: 5,
            title: 'Run 5K', 
            completedDate: 'May 15, 2023'
        },
        { 
            id: 6,
            title: 'Drink 8 Glasses of Water Daily', 
            completedDate: 'April 30, 2023'
        }
    ];
    
    // Render current goals
    const progressCards = document.querySelector('.progress-cards');
    progressCards.innerHTML = '';
    
    goals.forEach(goal => {
        const progressCard = document.createElement('div');
        progressCard.className = 'progress-card';
        progressCard.innerHTML = `
            <div class="progress-info">
                <h4>${goal.title}</h4>
                <p>${goal.description}</p>
                <div class="progress-stats">
                    <span class="current">${goal.current} ${goal.unit}</span>
                    <span class="divider">${goal.category === 'weight' ? '→' : '/'}</span>
                    <span class="target">${goal.target} ${goal.unit}</span>
                </div>
            </div>
            <div class="progress-visual">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${goal.progress}%;"></div>
                </div>
                <span class="progress-percent">${goal.progress}%</span>
            </div>
            <div class="goal-actions">
                <button class="action-btn edit" data-id="${goal.id}"><i class="fas fa-edit"></i></button>
                <button class="action-btn delete" data-id="${goal.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        progressCards.appendChild(progressCard);
    });
    
    // Render completed goals
    const completedCards = document.querySelector('.completed-cards');
    completedCards.innerHTML = '';
    
    completedGoals.forEach(goal => {
        const completedCard = document.createElement('div');
        completedCard.className = 'completed-card';
        completedCard.innerHTML = `
            <div class="completed-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="completed-info">
                <h4>${goal.title}</h4>
                <p>Completed on: ${goal.completedDate}</p>
            </div>
            <div class="completed-actions">
                <button class="action-btn delete" data-id="${goal.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        completedCards.appendChild(completedCard);
    });
}

function initGoalsCharts() {
    // In a real app, this would initialize actual charts
    document.getElementById('goalsCategoryChart').innerHTML = '<p class="mock-chart">Goals by Category Chart would be displayed here</p>';
}

function setupGoalsInteractions() {
    // Handle edit/delete buttons (delegated event listeners)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn.edit')) {
            const goalId = e.target.closest('.action-btn').dataset.id;
            editGoal(goalId);
        }
        
        if (e.target.closest('.action-btn.delete')) {
            const goalId = e.target.closest('.action-btn').dataset.id;
            deleteGoal(goalId);
        }
    });
}

function editGoal(id) {
    // In a real app, this would load the goal data into the form
    alert('Would edit goal with ID: ' + id);
    
    // Show the form
    document.getElementById('goalFormContainer').style.display = 'block';
    window.scrollTo({
        top: document.getElementById('goalFormContainer').offsetTop - 20,
        behavior: 'smooth'
    });
}

function deleteGoal(id) {
    if (confirm('Are you sure you want to delete this goal?')) {
        // In a real app, this would delete from an API
        alert('Goal deleted (ID: ' + id + ')');
        loadGoals();
    }
}