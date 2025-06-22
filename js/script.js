/*Navbar*/
const navbar = document.getElementById("navbar");
const navContainer = document.querySelector("#main-navbar");
const navLinks = document.querySelectorAll("#main-navbar .nav-item");
const mainNavResume = document.querySelector("#main-navbar .resume");
const navlogo = document.querySelector(".logo-container");
const navContainer2 = document.querySelector("#side-navbar");
const navLinks2 = document.querySelectorAll("#side-navbar .nav-item");
const hamBtn = document.querySelector("#navbar #hamBtn");
const hamBtn2 = document.querySelector("#navbar #side-navbar .btn");
const sideNavResume = document.querySelector("#side-navbar .resume");
/*Sections*/
let sections = document.querySelectorAll(".parent-container");
const workWithMeBtn = document.querySelector("#introduction .content .btn");
const contactBtn = document.querySelector("#about .btn");
const showMoreBtn = document.querySelector("#work .btn");
const footerlogo = document.querySelector("#footer .logo-container");
const loader = document.getElementById("pre-loader");
const main = document.getElementById("main");
let currentItem = 6;
var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

/*Event listener*/
/*Window*/
window.addEventListener("load", setStyles);
window.addEventListener("resize", setStyles);
window.addEventListener("scroll", handleScroll);

document.addEventListener("DOMContentLoaded", function () {
  checkScroll();
  window.addEventListener("scroll", checkScroll);
});

/*Navbar*/
window.addEventListener("scroll", updateActiveSection);
document.addEventListener("DOMContentLoaded", updateActiveSection);
workWithMeBtn.addEventListener("click", handleClick);
contactBtn.addEventListener("click", handleClick);
navlogo.addEventListener("click", reloadPage);
footerlogo.addEventListener("click", reloadPage);
mainNavResume.addEventListener("click", downloadResume);
sideNavResume.addEventListener("click", downloadResume);

hamBtn.addEventListener("click", () => {
  navContainer2.style.transform = "translateX(0)";
  main.style.opacity = "0";
  navbar.style.overflow = "unset";
  body.classList.add("modal-open");
});

hamBtn2.addEventListener("click", () => {
  navContainer2.style.transform = "translateX(100%)";
  setTimeout(() => {
    navbar.style.overflow = "hidden";
  }, 400);
  main.style.opacity = "unset";
  body.classList.remove("modal-open");
});

for (let i = 0; i < navLinks2.length; i++) {
  navLinks2[i].addEventListener("click", function (event) {
    event.preventDefault();
    if (navContainer2.style.display === "flex") {
      navContainer2.style.transform = "translateX(100%)";
      setTimeout(() => {
        navbar.style.overflow = "hidden";
      }, 400);
      main.style.opacity = "unset";
      body.classList.remove("modal-open");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", handleClick);
  }

  for (let i = 0; i < navLinks2.length; i++) {
    navLinks2[i].addEventListener("click", handleClick);
  }
});

/*Show more button*/
document.addEventListener("DOMContentLoaded", function () {
  showMoreBtn.addEventListener("click", () => {
    let boxes = [
      ...document.querySelectorAll("#other-projects .child-container"),
    ];
    for (let i = currentItem; i < currentItem + 3 && i < boxes.length; i++) {
      boxes[i].style.display = "flex";
    }

    currentItem += 3;

    if (currentItem >= boxes.length) {
      showMoreBtn.style.display = "none";
    }
  });
});

/*function*/
/*Window functions*/
function reloadPage(event) {
  window.location.reload();
}

function setStyles() {
  if (window.innerWidth > 767) {
    navContainer2.style.display = "none";
    main.style.opacity = "unset";
  } else {
    navContainer2.style.display = "flex";
  }
}

function handleScroll() {
  const currentScroll = window.scrollY || document.documentElement.scrollTop;

  if (currentScroll > 0) {
    if (currentScroll > lastScrollTop) {
      navbar.style.top = "-100px";
      navContainer2.style.paddingTop = "100px";
    } else {
      navbar.style.top = "0";
      navContainer2.style.paddingTop = "0px";
    }
    lastScrollTop = currentScroll;
  }
}

function checkScroll() {
  const parentContainers = document.querySelectorAll(".parent-container");
  parentContainers.forEach(function (parent) {
    if (isPartiallyVisible(parent)) {
      parent.classList.add("visible");

      const childContainers = parent.querySelectorAll(".child-container");
      childContainers.forEach(function (child) {
        if (isPartiallyVisible(child)) {
          child.classList.add("visible");
        }
      });
    }
  });
}

/*Navbar functions*/
function downloadResume() {
  window.open("Resume.pdf", "_blank");
  return false;
}

function handleClick(event) {
  event.preventDefault();

  const targetId = this.getAttribute("href");
  const targetElement = document.querySelector(targetId);

  let offset = 0;
  if (targetId === "#about") {
    offset = targetElement.offsetTop - window.innerHeight / 2 + 660;
  } else if (targetId === "#work") {
    offset = targetElement.offsetTop - window.innerHeight / 2 + 400;
  } else if (targetId === "#contact") {
    offset = targetElement.offsetTop - window.innerHeight / 2 + 480;
  }

  window.scrollTo({
    top: offset,
    behavior: "smooth",
  });
}

function isPartiallyVisible(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const threshold = windowHeight * 0.35;

  return rect.bottom >= threshold && rect.top <= windowHeight - threshold;
}

function updateActiveSection() {
  sections.forEach((sec, index) => {
    if (isPartiallyVisible(sec)) {
      let id = sec.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      navLinks2.forEach((link) => {
        link.classList.remove("active");
      });

      document
        .querySelector(".nav-item[href='#" + id + "']")
        .classList.add("active");

      document
        .querySelector("#side-navbar .nav-item[href='#" + id + "']")
        .classList.add("active");
    }
  });
}
