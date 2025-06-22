const form = document.getElementById("contact-form");
const subject = document.getElementById("subject");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const formInputs = document.getElementsByClassName("input-field");
const body = document.querySelector("body");
const contactModal = document.getElementById("contact-modal");
const contactModalCloseBtn = document.getElementById("closeModal");
const statusMsg = document.getElementById("status-msg");

/* Event Listeners */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  executeRecaptcha();
});

Array.from(formInputs).forEach(function (e) {
  e.addEventListener("blur", function () {
    if (e.id === "subject") {
      validateText(e.value.trim(), subject);
    } else if (e.id === "name") {
      validateName(e.value.trim(), name);
    } else if (e.id === "email") {
      validateEmail(e.value.trim());
    } else if (e.id === "message") {
      validateMessage(e.value.trim());
    }
  });
});

function setDefault(element) {
  const box = element.parentElement;
  box.classList.remove("success");
  box.classList.remove("error");
}

function resetForm(formInputs) {
  Array.from(formInputs).forEach(function (e) {
    setDefault(e);
    e.value = "";
  });
}

function executeRecaptcha() {
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6LeHK-ApAAAAAFUnJrjvxNYSNjZRZZ4d0hHdVq2q")
      .then(function (token) {
        validateInputs(token);
      });
  });
}

contactModalCloseBtn.addEventListener("click", closeModal);

/* Validate Functions */
function validateInputs(token) {
  let formData = new FormData();

  let validSubject = validateText(subject.value.trim(), subject);
  let validName = validateName(name.value.trim(), name);
  let validEmail = validateEmail(email.value.trim());
  let validMessage = validateMessage(message.value.trim());

  if (validSubject && validName && validEmail && validMessage) {
    formData.append("subject", subject.value.trim());
    formData.append("name", name.value.trim());
    formData.append("email", email.value.trim());
    formData.append("message", message.value.trim());
    formData.append("token", token);

    sendData(formData);
    statusMsg.innerText = "Sending your message...";
    form.classList.add("disabled");
  }
}

/* Data send to contact */
function sendData(formData) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "contact.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.responseText;

      if (response.trim() === "Success") {
        console.log("Success");
        contactModal.classList.add("open");
        body.classList.add("modal-open");
        resetForm(formInputs);
        statusMsg.innerText = "";
        form.classList.remove("disabled");
      } else {
        console.log("Failed");
        statusMsg.innerText = response;
        form.classList.remove("disabled");
      }
    } else {
      console.log("error");
    }
  };
  xhr.send(formData);
}

/* Notification Functions */
function closeModal() {
  contactModal.classList.remove("open");
  body.classList.remove("modal-open");
}
