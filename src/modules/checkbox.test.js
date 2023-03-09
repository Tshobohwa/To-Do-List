import { JSDOM } from 'jsdom';
import 'jest-localstorage-mock';
import { checkTask } from './checkbox.js';

const dom = new JSDOM(
  '<!DOCTYPE html><html><body><ul class="todo-list"></ul></body></html>',
);
global.document = dom.window.document;
global.window = dom.window;

describe('checkTask', () => {
  it('should mark a task as completed when the checkbox is checked', () => {
    const task = {
      index: 123,
      completed: false,
    };
    const tasksArray = [task];
    const taskLi = document.createElement('li');
    taskLi.setAttribute('id', `task-${task.index}`);
    taskLi.classList.add('task-li');
    const taskInput = document.createElement('input');
    taskInput.classList.add('task-input');
    taskLi.appendChild(taskInput);
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    taskInput.parentElement.appendChild(checkbox);
    checkTask(checkbox, tasksArray);
    expect(task.completed).toBe(true);
  });
});