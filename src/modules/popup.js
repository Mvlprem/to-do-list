import newProject from "./project";
import task from "./task";

const popup = () => {
  const createPopup = () => {
    const div = document.createElement("div");
    div.classList.add("popup");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "inputValue";
    input.required = true;
    div.appendChild(input);

    const btnAdd = document.createElement("button");
    btnAdd.classList.add("btn-add");
    btnAdd.textContent = "Add";
    div.appendChild(btnAdd);
    btnAdd.addEventListener("click", submitPopup);

    const btnCancel = document.createElement("button");
    btnCancel.classList.add("btn-cancel");
    btnCancel.textContent = "Cancel";
    div.appendChild(btnCancel);
    btnCancel.addEventListener("click", closePopup);

    return div;
  };

  const displayPopup = (event) => {
    event.stopImmediatePropagation();
    const parent = event.target.parentElement;
    const popup = createPopup();
    event.target.style.display = "none";
    parent.appendChild(popup);
  };

  const closePopup = (event) => {
    event.stopImmediatePropagation();
    const popup = event.target.parentElement;
    const parent = popup.parentElement;
    const btnElement = popup.previousElementSibling;
    btnElement.style.display = "flex";
    parent.removeChild(popup);
  };

  const submitPopup = (event) => {
    event.stopImmediatePropagation();
    const input = event.target.previousElementSibling;
    const validityReport = input.reportValidity();
    if (!validityReport) return;

    const popupType =
      input.parentElement.previousElementSibling.classList.value;

    if (popupType === "new-project") {
      newProject(input.value);
      closePopup(event);
    } else if (popupType === "new-task") {
      const projectName = document.querySelector("#project-name").textContent;
      task().newTask(input.value, projectName);
      closePopup(event);
    }
  };

  return { displayPopup };
};

export default popup;
