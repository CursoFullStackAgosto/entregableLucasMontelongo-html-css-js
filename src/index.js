// const inputTask = document.getElementById("todo-input");
// const buttonAddTask = document.getElementById("add-task");
// const todoList = document.getElementById("todo-list");
// const saveAllTasks = document.getElementById("save-all-tasks");

// const createTask = () => {
//   if (inputTask.value.length === 0 || inputTask.value.trim() === "") {
//     inputTask.value = "";
//     return alert("Debes escribir una tarea");
//   }

//   const liElement = document.createElement("li");
//   liElement.innerHTML = `
// <input type="checkbox"/> 
// <span>${inputTask.value}</span>
// <i class="fa-sharp fa-solid fa-trash delete-button"></i>
// `;
//   todoList.appendChild(liElement);
//   const checkbox = liElement.querySelector("input[type='checkbox']");
//   checkbox.addEventListener("change", () => {
//     if (checkbox.checked) {
//       liElement.style.textDecoration = "line-through";
//     } else {
//       liElement.style.textDecoration = "none";
//     }
//   });

//   const deleteButton = liElement.querySelector(".delete-button");
//   deleteButton.addEventListener("click", () => {
//     todoList.removeChild(liElement);
//   });

//   inputTask.value = "";
// };

// buttonAddTask.addEventListener("click", createTask) ;

// saveAllTasks.addEventListener("click", () => {
//   localStorage.setItem("tasks", JSON.stringify(inputTask.value));
// });

// console.log(saveAllTasks);


const inputTask = document.getElementById("todo-input");
const buttonAddTask = document.getElementById("add-task");
const todoList = document.getElementById("todo-list");
const saveAllTasks = document.getElementById("save-all-tasks");

const createTask = (taskText) => {
  const liElement = document.createElement("li");
  liElement.innerHTML = `
    <input type="checkbox"/> 
    <span>${taskText}</span>
    <i class="fa-sharp fa-solid fa-trash delete-button"></i>
  `;
  todoList.appendChild(liElement);

  const checkbox = liElement.querySelector("input[type='checkbox']");
  checkbox.addEventListener("change", () => {
    liElement.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });

  const deleteButton = liElement.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    todoList.removeChild(liElement);
    saveTasks(); // Guarda las tareas después de eliminar
  });
};

const saveTasks = () => {
  const tasks = Array.from(todoList.children).map(li => {
    return {
      text: li.querySelector("span").innerText,
      completed: li.querySelector("input[type='checkbox']").checked
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTask(task.text));
  // Restaura el estado de cada tarea
  Array.from(todoList.children).forEach((li, index) => {
    const checkbox = li.querySelector("input[type='checkbox']");
    checkbox.checked = tasks[index].completed;
    li.style.textDecoration = tasks[index].completed ? "line-through" : "none";
  });
};

buttonAddTask.addEventListener("click", () => {
  if (inputTask.value.trim() === "") {
    return alert("Debes escribir una tarea");
  }
  createTask(inputTask.value.trim());
  inputTask.value = "";
  saveTasks(); // Guarda las tareas después de agregar una nueva
});

saveAllTasks.addEventListener("click", saveTasks);

// Carga las tareas al iniciar
loadTasks();


