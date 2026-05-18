const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCounter = document.getElementById("taskCounter");
const clearAllBtn = document.getElementById("clearAllBtn");
const emptyMessage = document.getElementById("emptyMessage");

loadTasks();
updateTaskCounter();
toggleEmptyMessage();

function addTask(taskText = taskInput.value.trim()) {

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTaskElement(taskText, false);

    saveTasks();

    updateTaskCounter();

    toggleEmptyMessage();

    taskInput.value = "";

}

function createTaskElement(taskText, completed) {

    const li = document.createElement("li");

    li.classList.add("task-item");

    li.innerHTML = `
        <span class="${completed ? "completed" : ""}">
            ${taskText}
        </span>

        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    const taskSpan = li.querySelector("span");

    taskSpan.addEventListener("click", function () {

        taskSpan.classList.toggle("completed");

        saveTasks();

    });

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        li.remove();

        saveTasks();

        updateTaskCounter();

        toggleEmptyMessage();

    });

}

addBtn.addEventListener("click", function () {

    addTask();

});

taskInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});

clearAllBtn.addEventListener("click", function () {

    taskList.innerHTML = "";

    saveTasks();

    updateTaskCounter();

    toggleEmptyMessage();

});

function updateTaskCounter() {

    const totalTasks = document.querySelectorAll(".task-item").length;

    taskCounter.innerText = `Total Tasks: ${totalTasks}`;

}

function toggleEmptyMessage() {

    const totalTasks = document.querySelectorAll(".task-item").length;

    if (totalTasks === 0) {

        emptyMessage.style.display = "block";

    }

    else {

        emptyMessage.style.display = "none";

    }

}

function saveTasks() {

    const tasks = [];

    document.querySelectorAll(".task-item").forEach(function (task) {

        tasks.push({
            text: task.querySelector("span").innerText,
            completed: task.querySelector("span").classList.contains("completed")
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

function loadTasks() {

    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(function (task) {

        createTaskElement(task.text, task.completed);

    });

}