document
  .getElementById("tbl-project-body")
  .addEventListener("click", function (event) {
    var deleteButton = event.target.closest(".delete-btn");
    if (deleteButton) {
      var projectId = deleteButton
        .closest("tr")
        .querySelector("td:first-child").textContent;

      var xhr = new XMLHttpRequest();
      xhr.open("POST", "delete_project.php");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = xhr.response;

          if (response.trim() === "success") {
            console.log("Successful deletion");
            modal.classList.add("open");
            body.classList.add("modal-open");
            deleteButton.closest("tr").remove();
          } else {
            console.log("Failed deletion");
          }
        } else {
          console.log("Failed deletion");
        }
      };
      xhr.send("projectId=" + encodeURIComponent(projectId));
    }
  });
