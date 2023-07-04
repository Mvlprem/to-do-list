import homepage from "./modules/home";
import { storage } from "./modules/storage";

const loadData = () => {
  const defaultProject = document.body.querySelector(".default-project");
  storage().getLocalStorage();
  homepage().displayProject(defaultProject);
};

window.addEventListener("DOMContentLoaded", loadData);
