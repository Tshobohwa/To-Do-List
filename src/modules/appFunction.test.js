import { JSDOM } from 'jsdom';
import 'jest-localstorage-mock';

const dom = new JSDOM('<!DOCTYPE html><html><body><ul class="todo-list"></ul></body></html>');
global.document = dom.window.document;
global.window = dom.window;

const {
  addTask,
  removeTask,
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
    const taskLi = document.querySelector('.task-li');
    const removeBtn = taskLi.querySelector('.delete-task__button');
    removeTask(tasksArray[0]);
    expect(tasksArray).toHaveLength(0);
    expect(document.querySelectorAll('.task-li')).toHaveLength(0);
  });
});
