let searchInputbyName = document.getElementById("search-input1");
let searchInputByLetter = document.getElementById("search-input2");
let mealListElement = document.getElementById("mealList");
let searchInput = document.getElementById("search-bar");

//start search 
async function search(term, type){
    let response;
    if (type === "name") {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    } else if (type === "letter") {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    }
    let data = await response.json();
    let meals = data.meals || [];
    return meals;
}

function displaySearchMeals(meals) {
    if (meals) {
    for (let i=0 ; i< meals.length; i++) {
        let meal = meals[i];
      let divCol = document.createElement("div");
      divCol.className = "col";
  
      let divContainer = document.createElement("div");
      divContainer.className = "div-container";

      let mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;
      mealName.setAttribute("data-meal-id", meal.idMeal);

      let mealImage = document.createElement("img");
      mealImage.src = meal.strMealThumb;
      mealImage.alt = "Meal Image";
      mealImage.style.width = "100%";
      mealImage.style.borderRadius = "2%";

      divContainer.append(mealImage, mealName);
      divCol.appendChild(divContainer);
      mealListElement.appendChild(divCol);


      mealName.addEventListener("click", function (e) {
        mealListElement.classList.replace("d-block", "d-none");
        searchInput.classList.replace("d-block", "d-none");
        pictureDetails.classList.replace("d-none", "d-block");
        let currentImage = e.target.dataset.mealId;

        fetchMealById(currentImage);
      });
    }
} else {
    let noMealsMessage = document.createElement("p");
    noMealsMessage.textContent = "No meals found for this area.";
    ingredientList.appendChild(noMealsMessage);
  }
}

async function startApp(){
    let termByName = searchInputbyName.value.trim();
    let termByLetter = searchInputByLetter.value.trim();

    if (termByName !== '') {
        let allMealsDataByName = await search(termByName, 'name');
        displaySearchMeals(allMealsDataByName); 
    } else if (termByLetter !== '') {
        let allMealsDataByLetter = await search(termByLetter, 'letter');
        displaySearchMeals(allMealsDataByLetter); 
    } else {
    
        mealListElement.innerHTML = "";
    }
}


searchInputbyName.addEventListener("input", startApp);

searchInputByLetter.addEventListener("input", startApp);
