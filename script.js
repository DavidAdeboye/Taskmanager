document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(task => addTaskToDOM(task.text, task.done));

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTaskToDOM(taskText, false);
            saveTasks();
            taskInput.value = '';
        }
    }

    function addTaskToDOM(taskText, isDone) {
        const listItem = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isDone;
        listItem.appendChild(checkbox);

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        if (isDone) taskSpan.classList.add('done');
        listItem.appendChild(taskSpan);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        listItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        listItem.appendChild(deleteButton);

        checkbox.addEventListener('change', function() {
            taskSpan.classList.toggle('done');
            saveTasks();
        });

        deleteButton.addEventListener('click', function() {
            listItem.remove();
            saveTasks();
        });

        editButton.addEventListener('click', function() {
            const newTaskText = prompt('Edit your task:', taskSpan.textContent);
            if (newTaskText !== null) {
                taskSpan.textContent = newTaskText.trim();
                saveTasks();
            }
        });

        taskList.appendChild(listItem);
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(listItem => {
            const checkbox = listItem.querySelector('input[type="checkbox"]');
            const taskSpan = listItem.querySelector('span');
            tasks.push({ text: taskSpan.textContent, done: checkbox.checked });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
