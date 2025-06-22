document.addEventListener("DOMContentLoaded", function () {
  fetch("about.php")
    .then((response) => response.json())
    .then((data) => {
      const aboutContent = document.querySelector("#about .content");

      // Update only the specific parts without clearing the entire content
      aboutContent.querySelector(".body-text").textContent =
        data.about_description;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
