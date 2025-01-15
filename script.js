//dark variables
const star = document.querySelector(".starT");
const create_task = document.querySelector(".create-task");
const container = document.querySelector(".container");
const task_container = document.querySelector(".task-container");
const checkT = document.querySelectorAll(".checkT");
const todo_wrapper = document.querySelectorAll(".todo-wrapper");
const total = document.querySelectorAll(".total");
const array = [
  "Complete online JavaScript course",
  "Jog around the park 3x",
  "10 minutes meditation",
  "Read for 1 hour",
  "Pick up groceries",
  "Complete Todo App on Frontend Mentor",
];
let arrayLength = 5;
const allT = document.querySelectorAll(".allT");
const activeT = document.querySelectorAll(".activeT");
const completedT = document.querySelectorAll(".completedT");
star.addEventListener("click", () => {
  create_task.classList.toggle("dark");
  container.classList.toggle("dark");
  task_container.classList.toggle("dark");
});

const Input = document.getElementById("input");
function newList(Value) {
  // todo-wrapper div
  const newDiv = document.createElement("div");
  newDiv.classList.add("todo-wrapper", "drag-item");
  newDiv.setAttribute("draggable", "true");
  //check-task div
  const newDiv1 = document.createElement("div");
  newDiv1.className = "check-task";
  //checkT div
  const newDiv2 = document.createElement("div");
  newDiv2.className = "checkT";
  newDiv2.addEventListener("click", function () {
    if (newDiv2.classList.contains("checked")) {
      newDiv2.classList.remove("checked");
      arrayLength += 1;
      total[0].innerText = `${arrayLength} items left`;
      total[1].innerText = `${arrayLength} items left`;
    } else {
      newDiv2.classList.add("checked");
      arrayLength -= 1;
      total[0].innerText = `${arrayLength} items left`;
      total[1].innerText = `${arrayLength} items left`;
    }
    if (
      activeT[0].classList.contains("selected") ||
      activeT[1].classList.contains("selected")
    ) {
      let tarN = newDiv2.parentElement.parentElement;
      tarN.style.display = `none`;
    }
    if (
      completedT[0].classList.contains("selected") ||
      completedT[1].classList.contains("selected")
    ) {
      let tarN = newDiv2.parentElement.parentElement;
      tarN.style.display = `none`;
    }
  });
  //todo-task div
  const newDiv3 = document.createElement("div");
  newDiv3.className = "todo-task";
  //check-task div child elements
  newDiv1.appendChild(newDiv2);
  newDiv1.appendChild(newDiv3);
  //deleteT div
  const newDiv4 = document.createElement("div");
  newDiv4.classList.add("deleteT");
  newDiv4.addEventListener("click", (e) => {
    let target = e.target;
    let targetCheck = target.parentElement.firstChild.firstChild;
    if (targetCheck.classList.contains("checked") === false) {
      arrayLength -= 1;
    }
    target.parentElement.remove();
    total[0].innerText = `${arrayLength} items left`;
    total[1].innerText = `${arrayLength} items left`;
    const tarD = target.parentElement.querySelector(":nth-child(2)");
    const DElement = tarD.innerText;
    const filteredArray = array.filter((item) => item !== DElement);
    array.length = 0;
    array.push(...filteredArray);
  });
  //todo-wrapper div child elements
  newDiv.appendChild(newDiv1);
  newDiv.appendChild(newDiv4);
  newDiv3.innerText = `${Value}`;
  task_container.appendChild(newDiv);
}
for (let i = 0; i < 6; i++) {
  newList(array[i]);
}
task_container.children[0].firstChild.firstChild.classList.add("checked");
total[0].innerText = `${arrayLength} items left`;
total[1].innerText = `${arrayLength} items left`;
Input.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && Input.value !== "") {
    newList(Input.value);
    array.push(Input.value);
    setTimeout(() => {
      Input.value = "";
    }, 100);
    arrayLength += 1;
    total[0].innerText = `${arrayLength} items left`;
    total[1].innerText = `${arrayLength} items left`;
  }
});

const clearC = document.querySelectorAll(".clearC");
for (let i = 0; i < 2; i++) {
  clearC[i].addEventListener("click", () => {
    const clearCom = document.querySelectorAll(".checked");
    for (let i = 0; i < clearCom.length; i++) {
      const tar = clearCom[i].parentNode.parentNode;
      tar.remove();
    }
  });
}
for (let i = 0; i < 2; i++) {
  allT[i].addEventListener("click", () => {
    allT[0].classList.add("selected");
    allT[1].classList.add("selected");
    activeT[0].classList.remove("selected");
    activeT[1].classList.remove("selected");
    completedT[0].classList.remove("selected");
    completedT[1].classList.remove("selected");
    for (let i = 0; i < array.length; i++) {
      task_container.children[i].style.display = `flex`;
    }
  });
  activeT[i].addEventListener("click", () => {
    activeT[0].classList.add("selected");
    activeT[1].classList.add("selected");
    allT[0].classList.remove("selected");
    allT[1].classList.remove("selected");
    completedT[0].classList.remove("selected");
    completedT[1].classList.remove("selected");
    for (let i = 0; i < array.length; i++) {
      if (
        task_container.children[i].firstChild.firstChild.classList.contains(
          "checked"
        )
      ) {
        task_container.children[i].style.display = `none`;
      } else {
        task_container.children[i].style.display = `flex`;
      }
    }
  });

  completedT[i].addEventListener("click", () => {
    completedT[0].classList.add("selected");
    completedT[1].classList.add("selected");
    activeT[0].classList.remove("selected");
    activeT[1].classList.remove("selected");
    allT[0].classList.remove("selected");
    allT[1].classList.remove("selected");
    for (let i = 0; i < array.length; i++) {
      if (
        task_container.children[i].firstChild.firstChild.classList.contains(
          "checked"
        ) === false
      ) {
        task_container.children[i].style.display = `none`;
      } else {
        task_container.children[i].style.display = `flex`;
      }
    }
  });
}

const dragList = document.getElementById("dragList");
let draggedItem = null;

// Add event listeners for drag and drop events
dragList.addEventListener("dragstart", handleDragStart);
dragList.addEventListener("dragover", handleDragOver);
dragList.addEventListener("drop", handleDrop);

// Drag start event handler
function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", draggedItem.innerHTML);
  console.log(test);
  event.target.style.opacity = "0.5";
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  const targetItem = event.target;
}
// Drop event handler
function handleDrop(event) {
  event.preventDefault();
  const targetItem = event.target;
  if (
    targetItem !== draggedItem &&
    targetItem.classList.contains("drag-item")
  ) {
    if (
      event.clientY >
      targetItem.getBoundingClientRect().top + targetItem.offsetHeight / 2
    ) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    }
  }
  draggedItem.style.opacity = "";
  draggedItem = null;
}
