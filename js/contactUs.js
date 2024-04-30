let userNameInput = document.getElementById("user-name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let ageInput = document.getElementById("age");
let passwordInput = document.getElementById("password");
let repasswordInput = document.getElementById("repassword");
let buttonSignUp = document.getElementById("buttonSignUp");

let nameRegex = /^[a-zA-Z\s'-]+$/;
let emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 let rePasswordRegex = new RegExp(`^${passwordInput.value}$`);
let phoneRegex = /^01\d{8}$/;
let ageRegex = /^\d+$/;

  userDataList= [];

  if (localStorage.getItem("userData") !== null) {
    userDataList = JSON.parse(localStorage.getItem("userData"));
  }
  
  function signUp() {
    if (
      validationSignUp(nameRegex, userNameInput) &
      validationSignUp(emailRegex, emailInput) &
      validationSignUp(phoneRegex, phoneInput) &
      validationSignUp(ageRegex, ageInput) &
      validationSignUp(passwordRegex, passwordInput) &
      validationSignUp(rePasswordRegex, repasswordInput)
    ) {
      window.location.href = "index.html";
      var newUser = {
        userName: userNameInput.value,
        userEmail: emailInput.value,
        userphone: phoneInput.value,
        useAge: ageInput.value,
        userPassword: passwordInput.value,
        userRePassword: repasswordInput.value,
      };
      userDataList.push(newUser);
      localStorage.setItem("userData", JSON.stringify(userDataList));
    } else {
      alert("please enter the correct information");
    }
  }

  //validation
function validationSignUp(regex, element) {
    if (regex.test(element.value) == true) {
      element.classList.add("is-valied");
      element.classList.remove("is-invalied");
      element.nextElementSibling.classList.replace("d-block","d-none")
      return true;
    } else {
      element.classList.add("is-invalied");
      element.classList.remove("is-valied");
      element.nextElementSibling.classList.replace("d-none","d-block")
      return false;
    }
  }



