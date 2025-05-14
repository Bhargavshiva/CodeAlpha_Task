// window.onload = () => {
//     loadTasks();
//     document.getElementById('themeToggle').addEventListener('click', toggleTheme);
//     if (localStorage.getItem("theme") === "dark") {
//       document.body.classList.add("dark");
//     }
//   };
  
//   function addTask() {
//     const input = document.getElementById('taskInput');
//     const priority = document.getElementById('priority').value;
//     const taskText = input.value.trim();
  
//     if (taskText === '') return;
  
//     createTaskElement(taskText, priority, false);
//     saveTask(taskText, priority, false);
//     input.value = '';
//   }
  
//   function createTaskElement(text, priority, completed) {
//     const li = document.createElement('li');
//     li.classList.add(priority.toLowerCase());
//     if (completed) li.classList.add('completed');
  
//     li.innerHTML = `
//       ${text} <span class="priority">${priority}</span>
//       <button onclick="removeTask(this)">🗑</button>
//     `;
  
//     li.addEventListener('click', function (e) {
//       if (e.target.tagName !== 'BUTTON') {
//         li.classList.toggle('completed');
//         updateLocalStorage();
//       }
//     });
  
//     document.getElementById('taskList').appendChild(li);
//   }
  
//   function removeTask(btn) {
//     btn.parentElement.remove();
//     updateLocalStorage();
//   }
  
//   function saveTask(text, priority, completed) {
//     const tasks = getTasks();
//     tasks.push({ text, priority, completed });
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
  
//   function getTasks() {
//     return JSON.parse(localStorage.getItem('tasks')) || [];
//   }
  
//   function loadTasks() {
//     const tasks = getTasks();
//     tasks.forEach(task => createTaskElement(task.text, task.priority, task.completed));
//   }
  
//   function updateLocalStorage() {
//     const tasks = [];
//     document.querySelectorAll('#taskList li').forEach(li => {
//       const text = li.childNodes[0].nodeValue.trim();
//       const priority = li.querySelector('.priority').textContent;
//       const completed = li.classList.contains('completed');
//       tasks.push({ text, priority, completed });
//     });
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }
  
//   function toggleTheme() {
//     document.body.classList.toggle("dark");
//     localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
//   }
  
  
window.onload = () => {
  loadTasks();
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};

function addTask() {
  const input = document.getElementById('taskInput');
  const priority = document.getElementById('priority').value;
  const taskText = input.value.trim();

  if (taskText === '') return;

  saveTask(taskText, priority, false);
  input.value = '';
  loadTasks(); // re-render sorted
}

function createTaskElement(text, priority, completed) {
  const li = document.createElement('li');
  li.classList.add(priority.toLowerCase());
  if (completed) li.classList.add('completed');

  li.innerHTML = `
    ${text} <span class="priority">${priority}</span>
    <button onclick="removeTask(this)">🗑</button>
  `;

  li.addEventListener('click', function (e) {
    if (e.target.tagName !== 'BUTTON') {
      li.classList.toggle('completed');
      updateLocalStorage();
    }
  });

  document.getElementById('taskList').appendChild(li);
}

function removeTask(btn) {
  btn.parentElement.remove();
  updateLocalStorage();
}

function saveTask(text, priority, completed) {
  const tasks = getTasks();
  tasks.push({ text, priority, completed });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();

  const priorityOrder = { low: 0, medium: 1, high: 2 };
  tasks.sort((a, b) => priorityOrder[a.priority.toLowerCase()] - priorityOrder[b.priority.toLowerCase()]);

  document.getElementById('taskList').innerHTML = ''; // clear old tasks
  tasks.forEach(task => createTaskElement(task.text, task.priority, task.completed));
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.childNodes[0].nodeValue.trim();
    const priority = li.querySelector('.priority').textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, priority, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}
