import './style.css';
import * as appFunction from './modules/appFunction.js';

const todoList = document.querySelector('.todo-list');

const todoArray = [
  {
    description: 'Sleep',
    completed: true,
    index: 3,
  },
  {
    description: 'wake up',
    completed: true,
    index: 0,
  },
  {
    description: 'Eat',
    completed: false,
    index: 2,
  },
  {
    description: 'Code',
    completed: false,
    index: 1,
  },
];

appFunction.displayTasks(todoArray, todoList);
todoList.addEventListener('click', (e) => {
  if (e.target.closest('.task-btn')) {
    const taskBtn = e.target.closest('.task-btn');
    appFunction.toggleIcon(taskBtn);
  }
});
