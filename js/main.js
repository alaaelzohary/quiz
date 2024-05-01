let sideBar = document.getElementById("sidebar");
let menuIcon = document.querySelector(".menu-bar");
let hiddenSideBar = document.getElementById("offcanvasScrolling");
let closeIcon = document.querySelector(".btn-close-nav");
let mealContainer = document.getElementById("meal-container");
let list = document.querySelector("#offcanvasScrolling .hidden-links ul.links");

window.addEventListener("load", () => {
  let loader = document.querySelector(".dots-spin");
  
  loader.classList.add("d-none");
  loader.addEventListener("transitionEnd", () => {
    document.body.removeChild(loader);
  })
  });


// sidebar
//opensidebar
if(menuIcon !== null ){
menuIcon.addEventListener("click", function () {
  sideBar.style.left = "15.5rem";
  menuIcon.classList.replace("d-block", "d-none");
  closeIcon.classList.replace("d-none", "d-block");
  // list.classList.replace("animate__fadeOutBottomLeft", "animate__fadeInUp");
 
  
});
}
//close sidebar
if(closeIcon !== null){
  closeIcon.addEventListener("click", function () {
    sideBar.style.left = "0rem";
    hiddenSideBar.style.left = " 0rem";
    menuIcon.classList.replace("d-none", "d-block");
    closeIcon.classList.replace("d-block", "d-none");
    // list.classList.replace("animate__fadeInUp","animate__fadeOutBottomLeft");
    // listLi.classList.replace("animate__fadeInUp","animate__fadeOutBottomLeft");
  
}); 
}
//end sidebar


// ========================================================start landing page ==================================


async function fetchAllPictures() {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  let data = await response.json();
  let allPictures = data.meals;
  return allPictures;
}

function displayAllMealsPic(allmeals) {
  if (allmeals) {
    for (let i=0 ; i< allmeals.length; i++) {
        let meal = allmeals[i];
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
      mealContainer.appendChild(divCol);


      mealName.addEventListener("click", function (e) {
        mealContainer.classList.replace("d-block", "d-none");
        pictureDetails.classList.replace("d-none", "d-block");
        let currentImage = e.target.dataset.mealId;

        fetchMealById(currentImage);
      });
    }
} else {
    let noMealsMessage = document.createElement("p");
    noMealsMessage.textContent = "No meals found for this area.";
    mealContainer.appendChild(noMealsMessage);
  }
}

async function appStart(){
  let arr = await fetchAllPictures();
  displayAllMealsPic(arr);
}

appStart();

