import { projectObj } from "./storage";
import { format, startOfWeek, endOfWeek, parseISO } from "date-fns";
import task from "./task";

const filter = () => {
  const parent = document.querySelector(".task-list");
  const child = document.querySelector(".new-task");
  const TODAY = format(new Date(), "yyyy-MM-dd");

  const today = () => {
    for (const project in projectObj) {
      projectObj[project].taskList.forEach((obj) => {
        const div = task().createTask(obj.task, obj.dueDate);
        if (obj.dueDate === TODAY) parent.insertBefore(div, child);
        else div.style.display = "none";
        div.children.item(0).style.display = "none";
        div.children.item(1).innerHTML = obj.task + `<span>[${project}]</span>`;
        div.children.item(2).style.pointerEvents = "none";
        div.children.item(3).style.display = "none";
      });
    }
  };

  const thisWeek = () => {
    const weekStart = format(startOfWeek(parseISO(TODAY)), "yyyy-MM-dd");
    const weekEnd = format(endOfWeek(parseISO(TODAY)), "yyyy-MM-dd");
    for (const project in projectObj) {
      projectObj[project].taskList.forEach((obj) => {
        const div = task().createTask(obj.task, obj.dueDate);
        const sort = obj.dueDate >= weekStart && obj.dueDate <= weekEnd;
        if (sort) parent.insertBefore(div, child);
        else div.style.display = "none";
        div.children.item(0).style.display = "none";
        div.children.item(1).innerHTML = obj.task + `<span>[${project}]</span>`;
        div.children.item(2).style.pointerEvents = "none";
        div.children.item(3).style.display = "none";
      });
    }
  };

  return { today, thisWeek };
};

export default filter;
