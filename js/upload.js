const uploadForm = document.getElementById("upload-form");
const uploadFormInput = document.querySelectorAll("#upload-form .input-field");
const projectName = document.getElementById("project-name");
const demoUrl = document.getElementById("demo-url");
const depoUrl = document.getElementById("depository-url");
const description = document.getElementById("description");
const uploadBox = document.getElementById("upload-box");
const uploadImg = document.getElementById("upload-img");
const imageView = document.getElementById("img-view");
var uploadedImage;

/*Event Listeners*/
uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validateUploadInputs();
});

Array.from(uploadFormInput).map(function (e) {
  e.addEventListener("blur", function () {
    if (e.id === "project-name") {
      validateText(e.value.trim(), projectName);
    } else if (e.id === "demo-url") {
      validateUrl(e.value.trim(), demoUrl);
    } else if (e.id === "depository-url") {
      validateUrl(e.value.trim(), depoUrl);
    } else if (e.id === "description") {
      validateDescription(e.value.trim(), description);
    }
  });
});

/*Validate Functions*/
function validateUploadInputs() {
  let formData = new FormData();

  let validText = validateText(projectName.value.trim(), projectName);
  let validDemoUrl = validateUrl(demoUrl.value.trim(), demoUrl);
  let validDepositoryUrl = validateUrl(depoUrl.value.trim(), depoUrl);
  let validDescription = validateDescription(
    description.value.trim(),
    description
  );

  if (validText && validDemoUrl && validDepositoryUrl && validDescription) {
    var uploadedImage = document.getElementById("upload-img").files[0];

    let validProjectName = sanitizeInput(projectName.value.trim());
    let validDemoUrl = sanitizeInput(demoUrl.value.trim());
    let validDepositoryUrl = sanitizeInput(depoUrl.value.trim());
    let validDescription = sanitizeInput(description.value.trim());

    if (uploadedImage) {
      formData.append("project_name", validProjectName);
      formData.append("demo_url", validDemoUrl);
      formData.append("depository_url", validDepositoryUrl);
      formData.append("description", validDescription);
      formData.append("project_image", uploadedImage);

      sendUploadData(formData);
    } else {
      console.error("No image selected.");
    }
  } else {
    console.error("Form inputs are not valid.");
  }
}

/*Data send to Php file*/
function sendUploadData(formData) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "upload.php", true);
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
uploadImg.addEventListener("change", uploadImage);

function uploadImage() {
  let imgLink = URL.createObjectURL(uploadImg.files[0]);
  imageView.style.backgroundImage = `url(${imgLink})`;
  imageView.textContent = "";
  imageView.style.border = 0;
}

uploadBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

uploadBox.addEventListener("drop", function (e) {
  e.preventDefault();
  uploadImg.files = e.dataTransfer.files;
  uploadImage();
});
