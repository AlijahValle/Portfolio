document.addEventListener("DOMContentLoaded", function () {
  fetch("project.php")
    .then((response) => response.json())
    .then((data) => {
      const tblBody = document.querySelector("#tbl-project-body");
      tblBody.innerHTML = "";

      data.forEach((project) => {
        const row = document.createElement("tr");
        row.classList.add("project-info");
        row.innerHTML = `
          <td>${project.project_id}</td>
          <td>${project.project_name}</td>
          <td>${project.date_posted}</td>
          <td class="action-btns">
            <button class="edit-btn">
              <svg viewBox="0 0 72 72" class="icon-svg">
              <path
                class="icon-path"
                d="M38.406 22.234l11.36 11.36L28.784 54.576l-12.876 4.307c-1.725.577-3.367-1.065-2.791-2.79l4.307-12.876L38.406 22.234zM41.234 19.406l5.234-5.234c1.562-1.562 4.095-1.562 5.657 0l5.703 5.703c1.562 1.562 1.562 4.095 0 5.657l-5.234 5.234L41.234 19.406z"
              ></path>
            </svg>
            </button>
            <button class="delete-btn">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                class="icon-svg"
              >
                <path
                  class="icon-path"
                  fill="#273686"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                />
              </svg>
            </button>
          </td>
          `;
        tblBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching dynamic content:", error));
});
