import homepage from "./home";
import { projectObj, storage } from "./storage";

const newProject = (projectName) => {
  const button = document.createElement("button");
  button.classList.add("project");

  const icon = document.createElement("span");
  icon.classList.add("material-icons");
  icon.classList.add("icon-size");
  icon.textContent = "source";
  button.appendChild(icon);

  const name = document.createElement("span");
  name.textContent = projectName;
  button.appendChild(name);

  const remove = document.createElement("span");
  remove.classList.add("material-icons");
  remove.classList.add("icon-size");
  remove.classList.add("btn-remove");
  remove.textContent = "delete_forever";
  button.appendChild(remove);
  remove.addEventListener("click", deleteProject);

  const parent = document.querySelector(".user-project-list");
  const child = document.querySelector(".new-project");
  parent.insertBefore(button, child);

  // reinstantiating queries to get the reference for new elements
  homepage().projectList;
};

const deleteProject = (event) => {
  event.stopImmediatePropagation();
  const child = event.target.parentElement;
  const parent = child.parentElement;
  const projectName = event.target.previousElementSibling.textContent;
  const defaultProject = document.body.querySelector(".default-project");

  delete projectObj[projectName];
  storage().updateLocalStorage();
  parent.removeChild(child);
  homepage().displayProject(defaultProject);
};

export default newProject;
