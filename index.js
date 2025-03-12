const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = ""; 
    tasks.forEach((task, index) => displayTask(task, index));
};

const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const displayTask = (task, index) => {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    if (task.completed) {
        taskCard.classList.add("completed");
    }

    taskCard.innerHTML = `
        <div class="task-details">
            <h4>${task.title}</h4>
            <p><strong>Description:</strong> ${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
        </div>
        <div class="task-actions">
            <span class="complete-span">Complete <input type="checkbox" ${task.completed ? "checked" : ""}></span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const checkbox = taskCard.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
        const tasks = getAllTasks();
        tasks[index].completed = checkbox.checked;
        saveTasks(tasks);
        loadTasks();
    });

    taskCard.querySelector(".edit-btn").addEventListener("click", () => {
        const tasks = getAllTasks();
        const taskToEdit = tasks[index];

        document.getElementById("title").value = taskToEdit.title;
        document.getElementById("description").value = taskToEdit.description;
        document.getElementById("priority").value = taskToEdit.priority;
        document.getElementById("deadline").value = taskToEdit.deadline;

        document.getElementById("editIndex").value = index;
    });

    taskCard.querySelector(".delete-btn").addEventListener("click", () => {
        const tasks = getAllTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        loadTasks();
    });

    taskList.appendChild(taskCard);
};

const getAllTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const tasks = getAllTasks();
    const editIndex = document.getElementById("editIndex").value;

    const newTask = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        deadline: document.getElementById("deadline").value,
        completed: false,
    };

    if (editIndex) {
        tasks[editIndex] = newTask;
        document.getElementById("editIndex").value = "";
    } else {
        tasks.push(newTask);
    }

    saveTasks(tasks);
    loadTasks();
    taskForm.reset();
});

// Initial load
loadTasks();
