'use strict';


const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [

];

if (JSON.parse(localStorage.getItem('todoDataSave')) !== null) {
    todoData = JSON.parse(localStorage.getItem('todoDataSave'));
} else {
    localStorage.removeItem('todoDataSave');
}

const render = function () {
    
    todoList.textContent = '';
    todoCompleted.textContent = '';
    localStorage.todoDataSave = JSON.stringify(todoData);


    todoData.forEach(function(item) {
        //todoData = JSON.parse(localStorage.todoDataSave);
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                    '<div class="todo-buttons">' + 
                        '<button class="todo-remove"></button>' +
                        '<button class="todo-complete"></button>' +
                    '</div>';
        
        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render ();
        });

        const btnTodoRemove = li.querySelector('.todo-remove');
        btnTodoRemove.addEventListener('click', function() {
            let number = todoData.indexOf(item, 0);
            todoData.splice(number, 1); 
            li.remove();
            localStorage.todoDataSave = JSON.stringify(todoData);
        });

    });
};

todoControl.addEventListener('submit', function(event) {
    event.preventDefault();

    if (headerInput.value !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };

        todoData.push(newTodo);

        render();

        headerInput.value = '';
    }
});


render();