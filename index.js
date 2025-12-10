let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
  const saved = localStorage.getItem("tasks");

  if (saved) {
    return JSON.parse(saved);
  } else {
    return items;
  }
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	//const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

	deleteButton.addEventListener("click", function () {
    clone.remove();
    items = getTasksFromDOM();
    saveTasks(items);
  });

	duplicateButton.addEventListener("click", function () {
    const itemText = textElement.textContent;
    const copyItem = createItem(itemText);
    listElement.prepend(copyItem);
    items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
	const allItemsText = document.querySelectorAll(".to-do__item-text");
  const tasks = [];

  allItemsText.forEach(function (elem) {
    tasks.push(elem.textContent);
  });

  return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();

items.forEach(function (item) {
  const element = createItem(item);
  listElement.append(element);
});

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const textInput = inputElement.value;

  const newElement = createItem(textInput);
  listElement.prepend(newElement);

  items = getTasksFromDOM();
  saveTasks(items);

  inputElement.value = "";
});
