document.addEventListener('DOMContentLoaded', function() {
    // Initialize nutrition page
    initNutritionForm();
    loadNutritionData();
    setupWaterTracker();
    initNutritionCharts();
    
    // Set up event listeners
    setupNutritionInteractions();
});

function initNutritionForm() {
    // Initialize date picker
    flatpickr("#nutritionDate", {
        dateFormat: "Y-m-d",
        defaultDate: "today"
    });
    
    // Handle form toggle
    const addFoodBtn = document.getElementById('addFoodBtn');
    const nutritionFormContainer = document.getElementById('nutritionFormContainer');
    const cancelNutritionBtn = document.getElementById('cancelNutritionBtn');
    const closeNutritionForm = document.getElementById('closeNutritionForm');
    
    addFoodBtn.addEventListener('click', function() {
        nutritionFormContainer.style.display = 'block';
        window.scrollTo({
            top: nutritionFormContainer.offsetTop - 20,
            behavior: 'smooth'
        });
    });
    
    cancelNutritionBtn.addEventListener('click', function() {
        nutritionFormContainer.style.display = 'none';
    });
    
    closeNutritionForm.addEventListener('click', function() {
        nutritionFormContainer.style.display = 'none';
    });
    
    // Handle "Add to meal" buttons
    const addToMealBtns = document.querySelectorAll('.add-food-to-meal');
    addToMealBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mealType = this.textContent.includes('breakfast') ? 'breakfast' :
                            this.textContent.includes('lunch') ? 'lunch' :
                            this.textContent.includes('dinner') ? 'dinner' : 'snack';
            
            document.getElementById('mealType').value = mealType;
            nutritionFormContainer.style.display = 'block';
            window.scrollTo({
                top: nutritionFormContainer.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });
    
    // Handle form submission
    const nutritionForm = document.getElementById('nutritionForm');
    nutritionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const foodName = document.getElementById('foodName').value;
        const mealType = document.getElementById('mealType').value;
        const servingSize = document.getElementById('servingSize').value;
        const servings = document.getElementById('servings').value;
        const calories = document.getElementById('calories').value;
        const protein = document.getElementById('protein').value;
        const carbs = document.getElementById('carbs').value;
        const fats = document.getElementById('fats').value;
        
        // Validate
        if (!foodName || !mealType || !servingSize || !servings || !calories || !protein || !carbs || !fats) {
            alert('Please fill in all required fields');
            return;
        }
        
        // In a real app, this would save to an API
        alert('Food item added successfully!');
        
        // Reset form
        nutritionForm.reset();
        nutritionFormContainer.style.display = 'none';
        
        // Reload nutrition data
        loadNutritionData();
    });
}

function loadNutritionData() {
    // Update the macros circles
    const caloriesCircle = document.querySelector('#calories-circle .circle-fill');
    const percent = (1650 / 2200) * 100;
    caloriesCircle.style.strokeDasharray = `${percent}, 100`;
    
    // In a real app, this would fetch from an API
}

function setupWaterTracker() {
    const glasses = document.querySelectorAll('.glass');
    let filledGlasses = 5; // Starting with 5 filled glasses
    
    // Initialize glasses
    glasses.forEach((glass, index) => {
        if (index < filledGlasses) {
            glass.classList.add('filled');
        }
        
        glass.addEventListener('click', function() {
            const glassNumber = parseInt(this.dataset.glass);
            
            if (glassNumber === filledGlasses) {
                // Toggle this glass
                this.classList.toggle('filled');
                filledGlasses = this.classList.contains('filled') ? glassNumber : glassNumber - 1;
            } else if (glassNumber < filledGlasses) {
                // Unfill this and all subsequent glasses
                for (let i = glassNumber; i <= glasses.length; i++) {
                    glasses[i - 1]?.classList.remove('filled');
                }
                filledGlasses = glassNumber - 1;
            } else {
                // Fill up to this glass
                for (let i = 1; i <= glassNumber; i++) {
                    glasses[i - 1].classList.add('filled');
                }
                filledGlasses = glassNumber;
            }
            
            // Update water amount display
            document.querySelector('.water-amount').textContent = filledGlasses + ' glass' + (filledGlasses !== 1 ? 'es' : '');
        });
    });
    
    // Handle add water button
    document.getElementById('addWaterBtn')?.addEventListener('click', function() {
        if (filledGlasses < 8) {
            glasses[filledGlasses].classList.add('filled');
            filledGlasses++;
            document.querySelector('.water-amount').textContent = filledGlasses + ' glass' + (filledGlasses !== 1 ? 'es' : '');
        }
    });
}

function initNutritionCharts() {
    // In a real app, this would initialize actual charts
    document.getElementById('macroPieChart').innerHTML = '<p class="mock-chart">Macronutrient Distribution Chart would be displayed here</p>';
    document.getElementById('calorieTrendChart').innerHTML = '<p class="mock-chart">Calorie Trend Chart would be displayed here</p>';
}

function setupNutritionInteractions() {
    // Handle date navigation
    document.getElementById('prevDay')?.addEventListener('click', function() {
        alert('Would show previous day');
    });
    
    document.getElementById('nextDay')?.addEventListener('click', function() {
        alert('Would show next day');
    });
    
    // Handle edit/delete food items (delegated event listeners)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn.edit')) {
            const foodId = e.target.closest('.action-btn').dataset.id;
            editFoodItem(foodId);
        }
        
        if (e.target.closest('.action-btn.delete')) {
            const foodId = e.target.closest('.action-btn').dataset.id;
            deleteFoodItem(foodId);
        }
    });
}

function editFoodItem(id) {
    // In a real app, this would load the food item data into the form
    alert('Would edit food item with ID: ' + id);
    
    // Show the form
    document.getElementById('nutritionFormContainer').style.display = 'block';
    window.scrollTo({
        top: document.getElementById('nutritionFormContainer').offsetTop - 20,
        behavior: 'smooth'
    });
}

function deleteFoodItem(id) {
    if (confirm('Are you sure you want to delete this food item?')) {
        // In a real app, this would delete from an API
        alert('Food item deleted (ID: ' + id + ')');
        loadNutritionData();
    }
}