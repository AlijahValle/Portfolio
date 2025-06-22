const form = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const accountMsg = document.getElementById("msg");
const formInputs = document.getElementsByClassName("input-field");

/*Event Listeners*/
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

Array.from(formInputs).map(function (e) {
  e.addEventListener("blur", function () {
    if (e.id === "username") {
      validateUsername(e.value.trim());
    } else if (e.id === "password") {
      validatePassword(e.value.trim());
    }
  });
});

/*Helper Validate Functions*/
function validateInputs() {
  let formData = new FormData();

  let validUsername = validateUsername(username.value.trim());
  let validPassword = validatePassword(password.value.trim());

  if (validUsername && validPassword) {
    let validUsername = sanitizeInput(username.value.trim());
    let validPassword = sanitizeInput(password.value.trim());

    formData.append("username", validUsername);
    formData.append("password", validPassword);

    sendData(formData);
  }
}

function sendData(formData) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.response;

      if (response.trim() === "Success") {
        console.log("Login successfully");
        window.location.href = "admin.php";
        accountMsg.style.display = "none";
      } else {
        console.log("Account not found");
        accountMsg.style.display = "block";
      }
    } else {
      console.log("error");
    }
  };
  xhr.send(formData);
}
