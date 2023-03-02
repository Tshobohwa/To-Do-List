import './style.css';
import * as appFunction from './modules/appFunction.js';

const todoList = document.querySelector('.todo-list');
const addNewTodoInput = document.querySelector('.new-todo-input');
appFunction.displayTasks(todoList);
todoList.addEventListener('click', (e) => {
  if (
    e.target.closest('.task-btn')
    && !e.target.classList.contains('delete-task__button')
  ) {
    const taskBtn = e.target.closest('.task-btn');
    appFunction.focusTask(taskBtn);
  } else if (e.target.classList.contains('task-input')) {
    const taskBtn = e.target.closest('.task-li').querySelector('.task-btn');
    appFunction.focusTask(taskBtn);
  } else if (e.target.classList.contains('delete-task__button')) {
    const taskIndex = e.target.closest('.task-li').id.split('-')[1];
    appFunction.tasksArray.forEach((task) => {
      if (task.index === +taskIndex) {
        appFunction.removeTask(task);
      }
    });
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const focusedInput = document.activeElement;
    if (focusedInput === addNewTodoInput && addNewTodoInput.value !== '') {
      appFunction.addTask(addNewTodoInput);
      addNewTodoInput.value = '';
    }
  }
});
