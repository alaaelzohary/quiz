let allCategory = document.getElementById("all-category");
let categoryMeals = document.getElementById("category-meals");
let pictureDetails = document.querySelector(".pic-details");
let firstDetailsSection = document.querySelector(".first-section");
let secondDetailsSection = document.querySelector(".second-section");



async function filterByCategory() {
  let categoryResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let categoryList = await categoryResponse.json();
  let selectedCategory = categoryList.categories;
  return selectedCategory;
}

function displayCategoryName(categories) {
  allCategory.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];

    let divCol = document.createElement("div");
    divCol.className = "col-md-3";
    
    let divContainer = document.createElement("div");
    divContainer.classList.add("div-container-category", "rounded-2") ;
    divCol.style.cursor = "pointer";

    let categoryImage = document.createElement("img");
    categoryImage.src = category.strCategoryThumb;
    categoryImage.alt = "Category Image";
    categoryImage.classList.add("w-100", "rounded-2")

    let divContainerName = document.createElement("div");
    divContainerName.classList.add("div-container", "p-3", "rounded-2", "flex-column");

    let categoryName = document.createElement("h3");
    categoryName.textContent = category.strCategory;

    let categoryDescription = document.createElement("p");
    categoryDescription.textContent = category.strCategoryDescription;
    let deleteSpace = categoryDescription.textContent.trim();
    let words = deleteSpace.split(' ');
  
    if (words.length > 20) {
      categoryDescription.textContent = words.slice(0, 20).join(' ');
    }

    divContainerName.append(categoryName, categoryDescription)
    divContainer.append(categoryImage, divContainerName);
    divCol.appendChild(divContainer);
    allCategory.appendChild(divCol);

    // Add event listener to categoryImage
   divContainerName.addEventListener("click", function () {
      allCategory.classList.replace("d-block", "d-none");
      categoryMeals.classList.replace("d-none", "d-block");
      filterMealsByCategory(category.strCategory);
    });
  }
}

async function filterMealsByCategory(catMeal) {
  let catMealResponse = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catMeal}`
  );
  let categoryData = await catMealResponse.json();
  let categoryMealPic = categoryData.meals;
  displayCategoryImages(categoryMealPic);
  return categoryMealPic;
}

function displayCategoryImages(mealsInfo) {
  categoryMeals.innerHTML = "";
  for (let i = 0; i < mealsInfo.length; i++) {
    let meal = mealsInfo[i];

    let divCol = document.createElement("div");
    divCol.className = "col-md-3";

    let divContainer = document.createElement("div");
    divContainer.className = "div-container";

    let mealImage = document.createElement("img");
    mealImage.src = meal.strMealThumb;
    mealImage.alt = "Category Meal Image";
    mealImage.style.width = "100%";
    mealImage.style.borderRadius = "2%";
    
    let mealName = document.createElement("h3");
    mealName.textContent = meal.strMeal;
    mealName.setAttribute("data-meal-id", meal.idMeal);

    divContainer.append(mealImage, mealName);
    divCol.appendChild(divContainer);
    categoryMeals.appendChild(divCol);

    mealName.addEventListener("click", function (e) {
      allCategory.classList.replace("d-block", "d-none");
      categoryMeals.classList.replace("d-block", "d-none");
      pictureDetails.classList.replace("d-none", "d-block");
      let currentImage = e.target.dataset.mealId;
    
        fetchMealById(currentImage);
        
      
    });
}
}
async function showCategories() {
  let selectedCat = await filterByCategory();
  displayCategoryName(selectedCat);
}

showCategories();

// ======================================== start picture details=================================================================
async function fetchMealById(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  let meal = data.meals[0];
  displayPicById(meal);
  return meal;
}

function displayPicById(id) {
    let meal = id;

  //start first section
  // Create elements for mealImage details
  let mealImage = document.createElement("img");
  mealImage.src = `${meal.strMealThumb}/preview`;
  mealImage.setAttribute("data-meal-id", meal.idMeal);
  mealImage.alt = "Meal Thumbnail";
  mealImage.className = "w-100 rounded-2";
  // Create elements for mealName details
  let mealName = document.createElement("h2");
  mealName.textContent = meal.strMeal;
  mealName.setAttribute("data-meal-id", meal.idMeal);

  // start second section
  // Create elements for mealInstructurction details
  let mealInstructions = document.createElement("p");
  mealInstructions.textContent = `${meal.strInstructions}`;

  // Create elements for mealAre details
  // Create elements for mealTag details
  let mealAreaContainer = document.createElement("div");
  mealAreaContainer.className = "d-flex";

  let mealArea = document.createElement("h3");
  mealArea.textContent = "Area :";
  mealArea.style.fontWeight = "700";

  let mealAreaName = document.createElement("h3");
  mealAreaName.textContent = ` ${meal.strArea}`;
  mealAreaName.className = "semibold";
  mealAreaName.style.marginLeft = "8px";

  // Create elements for mealCategory details
  let mealCategoryContainer = document.createElement("div");
  mealCategoryContainer.className = "d-flex";

  let mealCategory = document.createElement("h3");
  mealCategory.textContent = "Category :";
  mealCategory.style.fontWeight = "700";

  let mealCategoryName = document.createElement("h3");
  mealCategoryName.textContent = ` ${meal.strCategory}`;
  mealCategoryName.className = "semibold";
  mealCategoryName.style.marginLeft = "8px";

  // Create elements for mealIngradiants details
  let ingredientList = document.createElement("li");
  ingredientList.style.listStyle = "none";
  ingredientList.style.marginLeft = "0";
  ingredientList.style.paddingLeft = "0";
  ingredientList.classList.add("d-flex", "flex-wrap");

  // Loop through the ingredients and measures
  for (let i = 1; i <= 20; i++) {
    let ingredient = meal[`strIngredient${i}`];
    let measure = meal[`strMeasure${i}`];

    if (ingredient && measure) {
      let listItem = document.createElement("li");
      listItem.classList.add(
        "border",
        "border-1",
        "py-1",
        "text-capitalize",
        "m-2",
        "p-1",
        "rounded-2"
      );
      listItem.style.color = "#5e63bb";
      listItem.style.backgroundColor = "#b9bcf4";
      //   listItem.style. ="#b9bcf4";
      listItem.textContent = `${ingredient} - ${measure}`;
      ingredientList.appendChild(listItem);
    }
  };

  // Create elements for mealTag details
  let mealTags = document.createElement("h3");
  mealTags.textContent = "Tags:";

  // Create elements for mealTagName details
  let mealTagsName = document.createElement("p");
  mealTagsName.textContent = ` ${meal.strTags}`;
  mealTagsName.classList.add(
    "border",
    "border-1",
    "text-danger",
    "py-1",
    "text-capitalize",
    "p-1",
    "mt-2",
    "mb-3",
    "rounded-2"
  );
  mealTagsName.style.background = "pink";
  mealTagsName.style.width = "fit-content";

  // Create elements for mealChannel details
  let mealChannel = document.createElement("a");
  mealChannel.setAttribute("href", `${meal.strYoutube}`);
  mealChannel.setAttribute("target", "_blank");
  mealChannel.classList.add(
    "text-decoration-none",
    "text-light",
    "btn",
    "btn-danger",
    "me-1"
  );
  mealChannel.textContent = "Youtube";

  // Create elements for mealSource details
  let mealSource = document.createElement("a");
  mealSource.setAttribute("href", `${meal.strSource}`);
  mealSource.setAttribute("target", "_blank");
  mealSource.classList.add(
    "text-decoration-none",
    "text-light",
    "btn",
    "btn-success"
  );
  mealSource.textContent = "Source";

  // Append elements to the container
  // firstSection.innerHTML = "";
  firstDetailsSection.append(mealImage, mealName);
  mealAreaContainer.append(mealArea, mealAreaName);
  mealCategoryContainer.append(mealCategory, mealCategoryName);
  // secondSection.innerHTML = "";
  secondDetailsSection.append(
    mealInstructions,
    mealAreaContainer,
    mealCategoryContainer,
    ingredientList,
    mealTags,
    mealTagsName,
    mealChannel,
    mealSource
  );

}



