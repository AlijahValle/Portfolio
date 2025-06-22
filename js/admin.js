//sections
const projectsSection = document.getElementById("project-section");
const uploadSection = document.getElementById("upload-modal");
const editProjectSection = document.getElementById("edit-project-modal");
const editIntroSection = document.getElementById("edit-intro-modal");
const editAboutSection = document.getElementById("edit-about-modal");
const body = document.querySelector("body");
const modal = document.querySelector(".modal");
const closeBtn = document.getElementById("closeModal");

/*Nav bar*/
const navItem = document.querySelectorAll(".nav-item");

Array.from(navItem).map(function (e) {
  e.addEventListener("click", function () {
    if (e.id === "upload") {
      projectsSection.style.display = "none";
      editIntroSection.classList.remove("open");
      editAboutSection.classList.remove("open");
      uploadSection.classList.add("open");
      editProjectSection.classList.remove("open");
    } else if (e.id === "home") {
      projectsSection.style.display = "flex";
      editIntroSection.classList.remove("open");
      editAboutSection.classList.remove("open");
      uploadSection.classList.remove("open");
      editProjectSection.classList.remove("open");
    } else if (e.id === "edit-intro") {
      editAboutSection.classList.remove("open");
      uploadSection.classList.remove("open");
      projectsSection.style.display = "none";
      editIntroSection.classList.add("open");
      editProjectSection.classList.remove("open");
    } else if (e.id === "edit-about") {
      editIntroSection.classList.remove("open");
      uploadSection.classList.remove("open");
      projectsSection.style.display = "none";
      editAboutSection.classList.add("open");
      editProjectSection.classList.remove("open");
    } else if (e.id === "logout") {
      logout();
    }
  });
});

window.addEventListener("resize", (e) => {
  if (window.innerWidth > 1023) {
    editIntroSection.classList.remove("open");
    editAboutSection.classList.remove("open");
    uploadSection.classList.remove("open");
    editProjectSection.classList.remove("open");
    projectsSection.style.display = "flex";
  } else {
    editIntroSection.classList.remove("open");
    editAboutSection.classList.remove("open");
    editProjectSection.classList.remove("open");
    uploadSection.classList.remove("open");
    projectsSection.style.display = "flex";
  }
});

//Open form
const openFormBtns = document.querySelectorAll("#welcome-section .btn");

Array.from(openFormBtns).map(function (e) {
  e.addEventListener("click", function () {
    if (e.id === "upload-btn") {
      openForm(uploadSection);
    } else if (e.id === "edit-intro-btn") {
      openForm(editIntroSection);
    } else if (e.id === "edit-about-btn") {
      openForm(editAboutSection);
    } else if (e.id === "logout-btn") {
      logout();
    }
  });
});

//Close form
const closeFormBtns = document.querySelectorAll(".close-btn");

Array.from(closeFormBtns).map(function (e) {
  e.addEventListener("click", function () {
    const formSection = e.parentElement.parentElement.parentElement;

    if (formSection === uploadSection) {
      closeForm(formSection);
    } else if (formSection === editProjectSection) {
      projectsSection.style.display = "flex";
      closeForm(formSection);
      reloadPage();
    } else if (formSection === editIntroSection) {
      closeForm(formSection);
    } else if (formSection === editAboutSection) {
      closeForm(formSection);
    }
  });
});

function closeForm(section) {
  section.classList.remove("open");
  body.classList.remove("modal-open");
}

function openForm(section) {
  section.classList.add("open");
  body.classList.add("modal-open");
}

//Modal
closeBtn.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.remove("open");
  body.classList.remove("modal-open");
  reloadPage(event);
}

/*Log out*/
function logout() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "logout.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      window.location.href = "login.php";
    }
  };
  xhr.send();
}
