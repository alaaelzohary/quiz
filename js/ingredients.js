let ingredientSection = document.getElementById("ingredient-section");
let ingredientList = document.getElementById("ingredient-list");

//start all ingredient
async function filterByIngredient() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let ingredientData = await response.json();
  let ingredientResult = ingredientData.meals || [];
  return ingredientResult;
}

async function filterByIngredientPic(ingredient) {
  try {
    let ingredientResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    let result = await ingredientResponse.json();
    let meals = result.meals || [];
    displayIngredientPic(meals);
    return meals;
  } catch (error) {
    console.error("Error fetching meals by ingredient:", error);
    return [];
  }
}

function displayIngredient(ingredient) {
  for (let i = 0; i < 20; i++) {
    let ingredients = ingredient[i];
    let divCol = document.createElement("div");
    divCol.className = "col-md-3";
    divCol.classList.add("text-center");
    divCol.style.cursor = "pointer";

    let ingredientIcon = document.createElement("a");
    ingredientIcon.innerHTML = `<i class="fa-solid fa-drumstick-bite fa-4x"></i>`;
    ingredientIcon.style.fontSize = "1rem";

    let ingredientName = document.createElement("h3");
    ingredientName.textContent = ingredients.strIngredient;

    let ingredientDescription = document.createElement("p");
    ingredientDescription.textContent = ingredients.strDescription;
    let deleteSpace = ingredientDescription.textContent.trim();
    let words = deleteSpace.split(' ');

    if (words.length > 20) {
      ingredientDescription.textContent = words.slice(0, 20).join(' ');
    }
 
    divCol.append(ingredientIcon, ingredientName, ingredientDescription);
    ingredientSection.appendChild(divCol);

    // Add event listener to areaIcon
    divCol.addEventListener("click", function () {
      ingredientSection.classList.replace("d-block", "d-none");
      ingredientList.classList.replace("d-none", "d-block");
      filterByIngredientPic(ingredients.strIngredient);
    });
  }
}

function displayIngredientPic(mealIngredient) {
  if (mealIngredient) {
    for (let i = 0; i < mealIngredient.length; i++) {
      let meal = mealIngredient[i];
      let divCol = document.createElement("div");
      divCol.className = "col-md-3";

      let divContainer = document.createElement("div");
      divContainer.className = "div-container";

      let mealImage = document.createElement("img");
      mealImage.src = meal.strMealThumb;
      mealImage.alt = "Countary Meal Image";
      mealImage.style.width = "100%";
      mealImage.style.borderRadius = "2%";

      let ingredientMealName = document.createElement("h3");
      ingredientMealName.textContent = meal.strMeal;
      ingredientMealName.setAttribute("data-meal-id", meal.idMeal);

      divContainer.append(mealImage, ingredientMealName);
      divCol.appendChild(divContainer);
      ingredientList.appendChild(divCol);
      ingredientMealName.addEventListener("click", function (e) {
        // window.location= "category.html";
        ingredientSection.classList.replace("d-block", "d-none");
        ingredientList.classList.replace("d-block", "d-none");
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

async function showAllIngredient() {
  let ingredientDataAll = await filterByIngredient();
  displayIngredient(ingredientDataAll);
}

showAllIngredient();
