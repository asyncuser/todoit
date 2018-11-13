const $input = document.getElementById('input-todo');
const $todoList = document.getElementById('todo-list');
const $pinTodoList = document.getElementById('todo-list-pin');
const $list = document.getElementsByClassName('list');
let todoArr = [];
const localStorageOn = checkLocalStorage();

function checkLocalStorage () {
  if (typeof (Storage) !== 'undefined') {
    const storage = localStorage.getItem('todoArray');
    if (storage === null) {
      localStorage.setItem('todoArray', '');
    }
    if (!(storage === '')) {
      getData(storage);
    }
    return true;
  }
  return false;
}

function getData (storage) {
  todoArr = todoArr.concat(storage.split(','));
  todoArr.forEach(element => {
    const $element = createTodoElement(element);
    $todoList.appendChild($element);
  });
}

$input.addEventListener('keyup', ({key, target}) => {
  if (key === 'Enter' && target.value !== ''){
    const inputValue = target.value;
    const $el = createTodoElement(inputValue);
    todoArr.push(inputValue);
    if (localStorageOn){
      localStorage.setItem('todoArray', todoArr);
    }
    $todoList.appendChild($el);
    target.value = '';
  }
});

function createTodoElement (content) {
  const $li = document.createElement('li');
  $li.className = 'todo-list-item';
  $li.innerHTML = `
         <label class="todo-list-item-label">
           <a href="#" class="fas fa-bolt bolt-normal"></a>
           <input type="checkbox" class="checkbox-input">
           <span class="content">${content}
           </span>
           <a href="#" class="fas fa-trash-alt remove-btn"></a>
         </label>
`;
  return $li;
}

[...$list].forEach(list => {
  list.addEventListener('click', event => {
    const {target} = event;
    const isRemoveBtn = target.classList.contains('remove-btn');
    const isPinBtnAdd = target.classList.contains('bolt-normal');
    const isPinBtnActive = target.classList.contains('bolt-pinned');
    const $toDoList = target.parentElement.parentElement.parentElement;
    const $toDoItem = target.parentElement.parentElement;
    if (isRemoveBtn) {
      const todoItem = target.previousSibling.previousSibling.innerText;
      $toDoList.removeChild($toDoItem);
      todoArr.splice(todoArr.indexOf(todoItem), 1);
      if (localStorageOn) {
        localStorage.setItem('todoArray', todoArr);
      }
    }
    if (isPinBtnAdd){
      target.classList.replace('bolt-normal', 'bolt-pinned');
      $toDoList.removeChild($toDoItem);
      $pinTodoList.appendChild($toDoItem);
    }
    if (isPinBtnActive){
      target.classList.replace('bolt-pinned', 'bolt-normal');
      $pinTodoList.removeChild($toDoItem);
      $todoList.appendChild($toDoItem);
    }
  });
});
