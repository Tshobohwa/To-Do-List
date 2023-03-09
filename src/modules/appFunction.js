import { displayCheck } from './checkbox.js';

export const tasksArray = JSON.parse(localStorage.getItem('tasksArray')) || [];

export const saveToLocalStorage = () => {
  localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
};

const sortTasks = () => {
  tasksArray.sort((a, b) => a.index - b.index);
};

const updadeIds = () => {
  tasksArray.forEach((task) => {
    task.index = tasksArray.indexOf(task);
  });
};

export const displayTasks = () => {
  const todoList = document.querySelector('.todo-list');
  todoList.innerHTML = '';
  tasksArray.forEach((task) => {
    todoList.insertAdjacentHTML(
      'beforeend',
      `
      <li class="task-li" id ="task-${task.index}">
          <input type="checkbox" class="task-checker" ${
  task.completed && 'checked'
}>
          <input type="text" class="task-input" value="${task.description}">
          <button class="task-btn">
            <i class="fa-solid fa-ellipsis-vertical task-btn__icon"></i>
            <i class="fa-solid fa-trash-can task-btn__icon icon-hidden delete-task__button"></i>
          </button>
      </li>`,
    );
    const taskLi = document.querySelector(`#task-${task.index}`);
    displayCheck(taskLi, task);
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

const unfocusTask = (taskLi) => {
  const taskBtn = taskLi.querySelector('.task-btn');
  toggleIcon(taskBtn);
  taskBtn.style.cursor = 'move';
  taskLi.style.backgroundColor = 'white';
};

export const focusTask = (btn = null) => {
  toggleIcon(btn);
  document.querySelectorAll('.task-li').forEach((taskLi) => {
    if (taskLi === btn.closest('.task-li')) {
      taskLi.style.backgroundColor = '#d3d3d3';
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

export const EditTask = (taskInput) => {
  const taskLi = taskInput.closest('.task-li');
  const task = tasksArray.find(
    (task) => task.index === +taskLi.id.split('-')[1],
  );
  task.description = taskInput.value;
  saveToLocalStorage();
  taskInput.blur();
  unfocusTask(taskLi);
};

export const removeAllCompleted = () => {
  const completedTaks = tasksArray.filter((task) => task.completed);
  completedTaks.forEach((task) => removeTask(task));
  updadeIds();
  sortTasks();
  saveToLocalStorage();
  displayTasks();
};
