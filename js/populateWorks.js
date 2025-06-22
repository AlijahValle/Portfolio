document.addEventListener("DOMContentLoaded", function () {
  fetch("project.php")
    .then((response) => response.json())
    .then((data) => {
      const otherProjectsContainer = document.getElementById("other-projects");
      otherProjectsContainer.innerHTML = "";

      data.forEach((project) => {
        const childContainer = document.createElement("div");
        childContainer.classList.add("child-container");
        childContainer.innerHTML = `
          <div class="other-projects-img">
            <a>
              <img class="Illustration" src="${project.project_img_path}" alt="Project Image"/>
            </a>
          </div>
          <div class="content">
            <h4 class="sub-section-heading">${project.project_name}</h4>
            <p class="body-text">${project.description}</p>
            <div class="icons">
              <a target="_blank" href="${project.depository_url}">
                <svg class="icon-svg" viewBox="0 0 16 16">
                  <path class="icon-path" fill="#273686" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </a>
              <a target="_blank" href="${project.demo_url}">
                <svg width="24" height="24" viewBox="0 0 24 24" class="icon-svg">
                  <path class="icon-path" fill="#273686" d="m8.9 16.5l5.1-5.1v2.25h2V8h-5.65v2h2.225L7.5 15.075zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
              </a>
            </div>
        `;
        otherProjectsContainer.appendChild(childContainer);
      });
    })
    .catch((error) => console.error("Error fetching dynamic content:", error));
});
