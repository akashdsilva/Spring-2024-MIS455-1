async function searchMeal() {
    const searchInput = document.getElementById('searchInput').value;
    if (!searchInput) {
        alert('Please enter a meal name.');
        return;
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();

    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = '';

    if (data.meals === null) {
        mealContainer.innerHTML = '<p>No meals found.</p>';
        document.getElementById('showAllBtn').style.display = 'none';
        return;
    }

    const mealsToShow = data.meals.slice(0, 5);
    mealsToShow.forEach(meal => {
        const mealHTML = `
            <div class="meal">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                <p><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
            </div>
        `;
        mealContainer.innerHTML += mealHTML;
    });

    document.getElementById('showAllBtn').style.display = 'block';
}

async function showAllMeals() {
    const searchInput = document.getElementById('searchInput').value;
    if (!searchInput) {
        alert('Please enter a meal name.');
        return;
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
    const data = await response.json();

    const mealContainer = document.getElementById('mealContainer');
    mealContainer.innerHTML = '';

    if (data.meals === null) {
        mealContainer.innerHTML = '<p>No meals found.</p>';
        return;
    }

    data.meals.forEach(meal => {
        const mealHTML = `
            <div class="meal">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
                <p><strong>Cooking Instructions:</strong> ${meal.strInstructions}</p>
            </div>
        `;
        mealContainer.innerHTML += mealHTML;
    });
}