import './style.css';
import * as appFunction from './modules/appFunction.js';

const todoList = document.querySelector('.todo-list');
const addNewTodoInput = document.querySelector('.new-todo-input');
appFunction.displayTasks(todoList);
todoList.addEventListener('click', (e) => {
  if (e.target.closest('.task-btn')) {
    const taskBtn = e.target.closest('.task-btn');
    appFunction.focusTask(taskBtn);
  } else if (e.target.classList.contains('task-input')) {
    e.preventDefault();
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
