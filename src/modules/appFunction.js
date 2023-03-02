export const tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

const saveToLocalStorage = () => {
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
};

const sortTasks = () => {
  tasksArray.sort((a, b) => a.index - b.index);
};

const updadeIds = () => {
  tasksArray.forEach((task) => {
    task.id = tasksArray.indexOf(task);
  });
};

export const displayTasks = () => {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';
  tasksArray.forEach((task) => {
    todoList.insertAdjacentHTML(
      'beforeend',
      `
      <li class="task-li" id ="task-${task.id}">
          <input type="checkbox" class="task-checker" ${
  task.completed && 'checked'
}>
          <input type="text" class="task-input" value="${task.description}">
          <button class="task-btn">
            <i class="fa-solid fa-ellipsis-vertical task-btn__icon"></i>
            <i class="fa-solid fa-trash-can task-btn__icon icon-hidden"></i>
          </button>
      </li>`,
    );
  });
};

const toggleIcon = (btn) => {
  const toggleBtnIcon = (taskBtn) => {
    taskBtn
      .querySelectorAll('.task-btn__icon')
      .forEach((icon) => icon.classList.toggle('icon-hidden'));
    taskBtn.style.cursor = taskBtn.style.cursor === 'pointer' ? 'move' : 'pointer';
  };
  document.querySelectorAll('.task-btn').forEach((taskBtn) => {
    if (taskBtn === btn) {
      toggleBtnIcon(taskBtn);
    } else if (
      taskBtn
        .querySelectorAll('.task-btn__icon')[0]
        .classList.contains('icon-hidden')
    ) {
      toggleBtnIcon(taskBtn);
    }
  });
};

export const focusTask = (btn) => {
  toggleIcon(btn);
  document.querySelectorAll('.task-li').forEach((taskLi) => {
    if (taskLi === btn.closest('.task-li')) {
      taskLi.style.backgroundColor = 'yellow';
    } else taskLi.style.backgroundColor = 'white';
  });
};

export const addTask = (taskInput) => {
  if (taskInput.value) {
    tasksArray.push({
      description: taskInput.value,
      completed: false,
      index: tasksArray.length,
    });
    saveToLocalStorage();
    displayTasks();
  }
};

export const removeTask = (task) => {
  const taskIndex = tasksArray.indexOf(task);
  tasksArray.splice(taskIndex, 1);
  updadeIds();
  sortTasks();
  saveToLocalStorage();
  displayTasks();
};
