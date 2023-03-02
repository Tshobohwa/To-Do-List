export const displayTasks = (taskArray, todoList) => {
  const displayedTaskArray = [...taskArray];
  displayedTaskArray.sort((task1, task2) => {
    if (task1.index > task2.index) return 1;
    return -1;
  });
  displayedTaskArray.forEach((task) => {
    todoList.insertAdjacentHTML(
      'beforeend',
      `
      <li class="task-li" id ="task-${task.id}">
          <input type="checkbox" class="task-checker" ${
  task.completed && 'checked'
}>
          <input type="text" class="task-input" value="${task.description}, ${
  task.index
}, ${task.completed} ">
          <button class="task-btn">
            <i class="fa-solid fa-ellipsis-vertical task-btn__icon"></i>
            <i class="fa-solid fa-trash-can task-btn__icon icon-hidden"></i>
          </button>
      </li>`,
    );
  });
};

export const toggleIcon = (btn) => {
  btn
    .querySelectorAll('.task-btn__icon')
    .forEach((icon) => icon.classList.toggle('icon-hidden'));
  btn.style.cursor = btn.style.cursor === 'pointer' ? 'move' : 'pointer';
};
