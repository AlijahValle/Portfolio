const editIntroForm = document.querySelector("#edit-intro-form");
const developerName = document.getElementById("developer-name");
const title = document.getElementById("title");
const titleDescription = document.getElementById("title-description");
const editIntroFormInput = document.querySelectorAll(
  "#edit-intro-form .input-field"
);

editIntroForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateIntroEditInputs();
});

fetchIntroDetails();

function fetchIntroDetails() {
  fetch("intro-details.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "",
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        document.querySelector("#developer-name").value = data.developer_name;
        document.querySelector("#title").value = data.title;
        document.querySelector("#title-description").value =
          data.title_description;
      } else {
        console.error("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error fetching project details:", error);
    });
}

Array.from(editIntroFormInput).map(function (e) {
  e.addEventListener("blur", function () {
    if (e.id === "developer-name") {
      validateName(e.value.trim(), developerName);
    } else if (e.id === "title") {
      validateText(e.value.trim(), title);
    } else if (e.id === "title-description") {
      validateDescription(e.value.trim(), titleDescription);
    }
  });
});

function validateIntroEditInputs() {
  let formData = new FormData();

  let validName = validateName(developerName.value.trim(), developerName);
  let validTitle = validateText(title.value.trim(), title);
  let validDescription = validateDescription(
    titleDescription.value.trim(),
    titleDescription
  );

  if (validName && validTitle && validDescription) {
    let validName = sanitizeInput(developerName.value.trim());
    let validTitle = sanitizeInput(title.value.trim());
    let validDescription = sanitizeInput(titleDescription.value.trim());

    formData.append("developer_name", validName);
    formData.append("title", validTitle);
    formData.append("title_description", validDescription);

    sendIntroEditData(formData);
  } else {
    console.error("Form inputs are not valid.");
  }
}

function sendIntroEditData(formData) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "edit-intro.php", true);
  xhr.onload = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let response = xhr.response;

      if (response.trim() === "Success") {
        console.log("Success");
        modal.classList.add("open");
        body.classList.add("modal-open");
      } else {
        console.log("Failed");
      }
    } else {
      console.log("error");
    }
  };
  xhr.send(formData);
}
