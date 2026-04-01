const form = document.querySelector(".js--form");
const input = document.querySelector(".js--form__input");
const list = document.querySelector(".js--todos-wrapper");

let todos = [];

const savedTodos = localStorage.getItem("todos");

if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();
    if (!value) return;

    const newTodo = {
        id: Date.now(),
        text: value,
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();

    input.value = "";
});

function renderTodos() {
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";
        li.dataset.id = todo.id;

        if (todo.completed) {
            li.classList.add("todo-item--checked");
        }

        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""}>
            <span class="todo-item__description">${todo.text}</span>
            <button class="todo-item__delete">Видалити</button>
        `;

        list.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}


list.addEventListener("click", (e) => {

    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    
    if (e.target.classList.contains("todo-item__delete")) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    }

    
    if (e.target.type === "checkbox") {
        todos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: e.target.checked };
            }
            return todo;
        });

        saveTodos();
        renderTodos();
    }

});