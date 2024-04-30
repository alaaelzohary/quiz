let allArea = document.getElementById("allareas");
let countaryMeals = document.getElementById("countary-meals");


//start area 
async function filterByArea() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  let areaData = await response.json();
  let areaList = (await areaData.meals) || [];
  return areaList;
}

async function fetchMealsByArea(area) {
  try {
    let areaResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let data = await areaResponse.json();
    let meals = data.meals;
    displayCountaryMeals(meals);
  } catch (error) {
    console.log("Error fetching meals:", error);
  }
}

function displayAreaMeals(areas) {
  allArea.innerHTML = "";
  for (let i = 0; i < areas.length; i++) {
    let area = areas[i];
    let divCol = document.createElement("div");
    divCol.className = "col-md-3";
    divCol.classList.add(
      "d-flex",
      "flex-column",
      "justify-content-center",
      "align-items-center"
    );
    divCol.style.cursor = "pointer";

    let areaIcon = document.createElement("a");
    areaIcon.innerHTML = `<i class="fa-solid fa-house-laptop"></i>`;
    areaIcon.style.fontSize = "4rem";

    let areaName = document.createElement("h2");
    areaName.textContent = area.strArea;

    divCol.append(areaIcon, areaName);
    allArea.appendChild(divCol);

    // Add event listener to areaIcon
    areaIcon.addEventListener("click", function () {
      allArea.classList.replace("d-block", "d-none");
      countaryMeals.classList.replace("d-none", "d-block");
      fetchMealsByArea(area.strArea);
    });
  }
}

function displayCountaryMeals(meals) {
  countaryMeals.innerHTML = "";
  if (meals) {
    for (let i = 0; i < meals.length; i++) {
      let meal = meals[i];
      let divCol = document.createElement("div");
      divCol.className = "col-md-3";

      let divContainer = document.createElement("div");
      divContainer.className = "div-container";

      let mealImage = document.createElement("img");
      mealImage.src = meal.strMealThumb;
      mealImage.alt = "Countary Meal Image";
      mealImage.style.width = "100%";
      mealImage.style.borderRadius = "2%";
 

      let mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;
      mealName.setAttribute("data-meal-id", meal.idMeal);

      divContainer.append(mealImage, mealName);
      divCol.appendChild(divContainer);
      countaryMeals.appendChild(divCol);
      //event lister on each picture
      mealName.addEventListener("click", function (e) {
        allArea.classList.replace("d-block", "d-none");
        countaryMeals.classList.replace("d-block", "d-none");
        pictureDetails.classList.replace("d-none", "d-block");
        let currentImage = e.target.dataset.mealId;
      
          fetchMealById(currentImage);
        
      });

    }
  } else {
    let noMealsMessage = document.createElement("p");
    noMealsMessage.textContent = "No meals found for this area.";
    countaryMeals.appendChild(noMealsMessage);
  }
}

async function showAll() {
  let areas = await filterByArea();
  displayAreaMeals(areas);
}

showAll();
