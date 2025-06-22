const editUploadForm = document.getElementById("edit-upload-form");
const editProjectName = document.getElementById("edit-project-name");
const editDemoUrl = document.getElementById("edit-demo-url");
const editDepoUrl = document.getElementById("edit-depository-url");
const editDescription = document.getElementById("edit-description");
const editUploadFormInput = document.querySelectorAll(
  "#edit-upload-form .input-field"
);
const editUploadBox = document.getElementById("edit-upload-box");
const editUploadImg = document.getElementById("edit-upload-img");
const editImageView = document.getElementById("edit-img-view");
var editUploadedImage;
var projectId;

/*Event Listeners*/
document
  .getElementById("tbl-project-body")
  .addEventListener("click", function (event) {
    var updateButton = event.target.closest(".edit-btn");
    if (updateButton) {
      projectId = updateButton
        .closest("tr")
        .querySelector("td:first-child").textContent;
      fetchProjectDetails(projectId);
      if (window.innerWidth > 1023) {
        projectsSection.style.display = "flex";
      } else {
        projectsSection.style.display = "none";
      }
      editProjectSection.classList.add("open");
      body.classList.add("modal-open");
    }
  });

function fetchProjectDetails(projectId) {
  fetch("project-details.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "projectId=" + encodeURIComponent(projectId),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.error) {
        document.querySelector("#edit-project-name").value = data.project_name;
        document.querySelector("#edit-demo-url").value = data.demo_url;
        document.querySelector("#edit-depository-url").value =
          data.depository_url;
        document.querySelector("#edit-description").value = data.description;
      } else {
        console.error("Error: " + data.error);
      }
    })
    .catch((error) => {
      console.error("Error fetching project details:", error);
    });
}

editUploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateEditUploadInputs();
});

Array.from(editUploadFormInput).map(function (e) {
  e.addEventListener("blur", function () {
    if (e.id === "edit-project-name") {
      validateText(e.value.trim(), editProjectName);
    } else if (e.id === "edit-demo-url") {
      validateUrl(e.value.trim(), editDemoUrl);
    } else if (e.id === "edit-depository-url") {
      validateUrl(e.value.trim(), editDepoUrl);
    } else if (e.id === "edit-description") {
      validateDescription(e.value.trim(), editDescription);
    }
  });
});

/*Validate Functions*/
function validateEditUploadInputs() {
  let formData = new FormData();

  let validText = validateText(editProjectName.value.trim(), editProjectName);
  let validDemoUrl = validateUrl(editDemoUrl.value.trim(), editDemoUrl);
  let validDepositoryUrl = validateUrl(editDepoUrl.value.trim(), editDepoUrl);
  let validDescription = validateDescription(
    editDescription.value.trim(),
    editDescription
  );

  if (validText && validDemoUrl && validDepositoryUrl && validDescription) {
    var editUploadedImage = document.getElementById("edit-upload-img").files[0];

    if (editUploadedImage) {
      formData.append("project_image", editUploadedImage);
    }

    let validProjectName = sanitizeInput(editProjectName.value.trim());
    let validDemoUrl = sanitizeInput(editDemoUrl.value.trim());
    let validDepositoryUrl = sanitizeInput(editDepoUrl.value.trim());
    let validDescription = sanitizeInput(editDescription.value.trim());

    formData.append("project_name", validProjectName);
    formData.append("demo_url", validDemoUrl);
    formData.append("depository_url", validDepositoryUrl);
    formData.append("description", validDescription);
    formData.append("project_id", projectId);

    sendEditUploadData(formData);
  } else {
    console.error("Form inputs are not valid.");
  }
}

/*Data send to Php file*/
function sendEditUploadData(formData) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "edit-project.php", true);
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

/*Upload img*/
editUploadImg.addEventListener("change", uploadEditImage);

function uploadEditImage() {
  let imgLink = URL.createObjectURL(editUploadImg.files[0]);
  editImageView.style.backgroundImage = `url(${imgLink})`;
  editImageView.textContent = "";
  editImageView.style.border = 0;
}

editUploadBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

editUploadBox.addEventListener("drop", function (e) {
  e.preventDefault();
  editUploadImg.files = e.dataTransfer.files;
  uploadEditImage();
});
