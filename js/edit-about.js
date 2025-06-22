const editAboutForm = document.querySelector("#edit-about-form");
const aboutDescription = document.getElementById("about-description");
const editAboutFormInput = document.querySelectorAll(
  "#edit-about-form .input-field"
);

editAboutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateAboutEditInputs();
});

fetchAboutDetails();

function fetchAboutDetails() {
  fetch("about-details.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "",
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        document.querySelector("#about-description").value =
          data.about_description;
      } else {
        console.error("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error fetching project details:", error);
    });
}

aboutDescription.addEventListener("blur", function (e) {
  validateDescription(aboutDescription.value.trim(), aboutDescription);
});

function validateAboutEditInputs() {
  let formData = new FormData();

  if (validateDescription(aboutDescription.value.trim(), aboutDescription)) {
    let validDescription = sanitizeInput(aboutDescription.value.trim());

    formData.append("about_description", validDescription);
    sendAboutEditData(formData);
  } else {
    console.error("Form inputs are not valid.");
  }
}

function sendAboutEditData(formData) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "edit-about.php", true);
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
