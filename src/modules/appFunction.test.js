import { JSDOM } from 'jsdom';
import 'jest-localstorage-mock';

const dom = new JSDOM(
  '<!DOCTYPE html><html><body><ul class="todo-list"></ul></body></html>',
);
global.document = dom.window.document;
global.window = dom.window;

const {
  addTask,
  removeTask,
  EditTask,
  removeAllCompleted,
  displayTasks,
  tasksArray,
} = require('./appFunction.js');

describe('addTask', () => {
  beforeEach(() => {
    localStorage.clear();
    tasksArray.length = 0;
    displayTasks();
  });

  test('adds a task to the list', () => {
    const input = document.createElement('input');
    input.value = 'New task';
    addTask(input);
    expect(tasksArray).toHaveLength(1);
    expect(document.querySelectorAll('.task-li')).toHaveLength(1);
  });
});

describe('removeTask', () => {
  beforeEach(() => {
    localStorage.clear();
    tasksArray.length = 0;
    tasksArray.push({
      description: 'Task 1',
      completed: false,
      index: 0,
    });
    displayTasks();
  });

  test('removes a task from the list', () => {
    removeTask(tasksArray[0]);
    expect(tasksArray).toHaveLength(0);
    expect(document.querySelectorAll('.task-li')).toHaveLength(0);
  });
});

describe('EditTask', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul class="todo-list">
        <li class="task-li" id="task-0">
          <input type="text" class="task-input" value="Task 1">
          <button class="task-btn">
            <i class="fa-solid fa-ellipsis-vertical task-btn__icon"></i>
            <i class="fa-solid fa-trash-can task-btn__icon icon-hidden delete-task__button"></i>
          </button>
        </li>
      </ul>
    `;
    localStorage.clear();
    tasksArray.length = 0;
    tasksArray.push({
      description: 'Task 1',
      completed: false,
      index: 0,
    });
    displayTasks();
  });

  test('should edit task description and save to local storage', () => {
    const taskInput = document.querySelector('.task-input');
    taskInput.value = 'Edited task';
    EditTask(taskInput);
    expect(tasksArray[0].description).toBe('Edited task');
  });
});

describe('remove all complete', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul class="todo-list">
        <li class="task-li" id="task-0">
          <input type="checkbox" class="task-checker" checked>
          <input type="text" class="task-input" value="Task 1">
          <button class="task-btn">
            <i class="fa-solid fa-ellipsis-vertical task-btn__icon"></i>
            <i class="fa-solid fa-trash-can task-btn__icon icon-hidden delete-task__button"></i>
          </button>
        </li>
        <li class="task-li" id="task-1">
          <input type="checkbox" class="task-checker">
          <input type="text" class="task-input" value="Task 2">
          <button class="task-btn">
            <i class="fa-solid fa-ellipsis-vertical task-btn__icon"></i>
            <i class="fa-solid fa-trash-can task-btn__icon icon-hidden delete-task__button"></i>
          </button>
        </li>
    </ul>
  `;
    localStorage.clear();
    tasksArray.length = 0;
    tasksArray.push(
      { description: 'Task 1', completed: true, index: 0 },
      { description: 'Task 2', completed: false, index: 1 },
    );
    displayTasks();
  });

  test('should remove all completed tasks', () => {
    removeAllCompleted();
    expect(tasksArray.length).toBe(1);
    expect(tasksArray[0].description).toBe('Task 2');
    expect(document.querySelectorAll('.task-li').length).toBe(1);
  });
});
