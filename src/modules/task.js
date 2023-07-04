import { projectObj, storage } from "./storage";

const task = () => {
  const parent = document.querySelector(".task-list");
  const child = document.querySelector(".new-task");

  const projectCheck = (projectName) => {
    if (projectName in projectObj) return;
    else projectObj[projectName] = { taskList: [] };
  };

  const newTask = (newTask, projectName) => {
    projectCheck(projectName);
    projectObj[projectName].taskList.push({ task: newTask });
    storage().updateLocalStorage();
    const newTaskElement = createTask(newTask);
    parent.insertBefore(newTaskElement, child);
  };

  const displayTasks = (projectName) => {
    if (projectObj === null) projectObj = { Inbox: { taskList: [] } };

    if (!(projectName in projectObj)) return;
    projectObj[projectName].taskList.forEach((obj) => {
      const taskElement = createTask(obj.task, obj.dueDate);
      parent.insertBefore(taskElement, child);
    });
  };

  const createTask = (task, dueDate) => {
    const div = document.createElement("div");
    div.classList.add("task");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "checkbox";
    div.appendChild(checkbox);
    checkbox.addEventListener("click", deleteTask);

    const p = document.createElement("p");
    p.textContent = task;
    div.appendChild(p);

    const date = document.createElement("input");
    date.type = "date";
    date.name = "date";
    date.value = dueDate;
    div.appendChild(date);
    date.addEventListener("change", updateDate);

    const icon = document.createElement("span");
    icon.classList.add("material-icons");
    icon.textContent = "delete_forever";
    div.appendChild(icon);
    icon.addEventListener("click", deleteTask);

    return div;
  };

  const updateDate = (dateEvent) => {
    const project = document.querySelector("#project-name");
    const projectName = project.textContent;
    const input = dateEvent.target;
    const taskElement = input.parentElement;
    const index = [...project.parentElement.children].indexOf(taskElement);
    projectObj[projectName].taskList[index - 1].dueDate = input.value;
    storage().updateLocalStorage();
  };

  const deleteTask = (event) => {
    const project = document.querySelector("#project-name");
    const projectName = project.textContent;
    const taskElement = event.target.parentElement;
    const index = [...project.parentElement.children].indexOf(taskElement);
    projectObj[projectName].taskList.splice(index - 1, 1);
    storage().updateLocalStorage();
    taskElement.remove();
  };

  return { newTask, createTask, displayTasks };
};

export default task;
