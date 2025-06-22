document.addEventListener("DOMContentLoaded", function () {
  fetch("introduction.php")
    .then((response) => response.json())
    .then((data) => {
      const introductionContent = document.querySelector(
        "#introduction .content"
      );

      introductionContent.querySelector(".main-heading").textContent =
        data.developer_name;
      introductionContent.querySelector(".sub-heading").textContent =
        data.title;
      introductionContent.querySelector(".body-text").textContent =
        data.title_description;
    })
    .catch((error) => console.error("Error fetching data:", error));
});
