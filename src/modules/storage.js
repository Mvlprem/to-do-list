import newProject from "./project";

let projectObj = {};

const storage = () => {
  const updateLocalStorage = () => {
    const serialized = JSON.stringify(projectObj);
    localStorage.setItem("projects", serialized);
  };

  const getLocalStorage = () => {
    const deserialized = JSON.parse(localStorage.getItem("projects"));
    projectObj = deserialized;
    for (const projects in projectObj) {
      if (projects === "Inbox") continue;
      else newProject(projects);
    }
  };

  return { updateLocalStorage, getLocalStorage };
};

export { projectObj, storage };
