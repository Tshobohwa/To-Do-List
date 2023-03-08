export const displayCheck = (taskLi, task) => {
  const taskInput = taskLi.querySelector('.task-input');
  if (task.completed) {
    taskInput.style.textDecoration = 'line-through';
  } else {
    taskInput.style.textDecoration = 'none';
  }
};

export const checkTask = (box, tasksArray) => {
  const taskLi = box.closest('.task-li');
  const task = tasksArray.find(
    (task) => task.index === +taskLi.id.split('-')[1],
  );
  task.completed = !task.completed;
  displayCheck(taskLi, task);
};
