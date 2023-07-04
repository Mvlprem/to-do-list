import popup from "./popup";
import task from "./task";
import filter from "./filtering";

const homepage = () => {
  const displayProject = (projectElement) => {
    const heading = document.body.querySelector("#project-name");
    const projectName = projectElement.querySelectorAll("span")[1].textContent;
    heading.textContent = projectName;

    updateSelection(projectElement);
    removePreviousProjectTasks();
    updateProjectContent(projectName);
  };

  const updateSelection = (projectElement) => {
    const children = document.querySelectorAll(".project");
    for (const child of children) child.classList.remove("selected");
    projectElement.classList.add("selected");
  };

  const removePreviousProjectTasks = () => {
    const parent = document.body.querySelectorAll(".task-list > div");
    if (parent === null) return;
    else [...parent].forEach((child) => child.remove());
  };

  const updateProjectContent = (projectName) => {
    const btnAddTask = document.body.querySelector(".new-task");

    if (projectName === "Today") {
      btnAddTask.style.display = "none";
      filter().today();
    } else if (projectName === "This Week") {
      btnAddTask.style.display = "none";
      filter().thisWeek();
    } else {
      btnAddTask.style.display = "flex";
      task().displayTasks(projectName);
    }
  };

  const displayNav = (event) => {
    event.stopImmediatePropagation();
    const nav = document.body.querySelector("nav");
    if (nav.style.display === "none") nav.style.display = "block";
    else nav.style.display = "none";
  };

  const projectList = document.body.querySelectorAll(".project");
  projectList.forEach((project) =>
    project.addEventListener("click", (e) => {
      e.stopImmediatePropagation();
      displayProject(project);
    })
  );
  const menu = document.body.querySelector(".menu");
  menu.addEventListener("click", displayNav);

  const btnAddProject = document.body.querySelector(".new-project");
  btnAddProject.addEventListener("click", popup().displayPopup);

  const btnAddTask = document.body.querySelector(".new-task");
  btnAddTask.addEventListener("click", popup().displayPopup);

  return { displayProject, projectList };
};

export default homepage;
