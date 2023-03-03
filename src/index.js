import './style.css';
import * as appFunction from './modules/appFunction.js';
import { checkTask } from './modules/checkbox';

const todoList = document.querySelector('.todo-list');
const addNewTodoInput = document.querySelector('.new-todo-input');
const clearCompletedBtn = document.querySelector('.clear-completed__btn');
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

todoList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') checkTask(e.target, appFunction.tasksArray);
  appFunction.saveToLocalStorage();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const focusedInput = document.activeElement;
    if (focusedInput === addNewTodoInput && addNewTodoInput.value !== '') {
      appFunction.addTask(addNewTodoInput);
      addNewTodoInput.value = '';
    } else if (document.activeElement.classList.contains('task-input')) {
      const taskInput = document.activeElement;
      appFunction.EditTask(taskInput);
    }
  }
});

clearCompletedBtn.addEventListener('click', appFunction.removeAllCompleted);
