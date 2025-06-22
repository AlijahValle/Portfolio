const inputField = document.querySelector(".input-field textarea");
const todoLists = document.querySelector(".todoLists");
const clearButton = document.querySelector(".clear-button");

inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim();

  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = ` <li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag);
    inputField.value = "";
  }
});

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
}

clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
});
