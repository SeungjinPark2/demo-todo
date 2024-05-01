const todoTxt = document.getElementById('todo-text');
const btn = document.getElementById('add-btn');
const refresh = document.getElementById('refresh-btn');
const ulTag = document.getElementById('myList')

addEventListener("load", async (e) => {
    const data = await fetchList();
    console.log(data);
    
    // remove all child
    ulTag.innerHTML = '';

    for(const t of data) {
        appendTodo(t);
    }
});


btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const todo = todoTxt.value;
    const result = await fetch('/submit', {
        method: 'POST',
        body: JSON.stringify({
            data: todo,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (result.status === 200) {
        appendTodo({
	    data: todo
	});
    }
});

async function fetchList() {
    const response = await fetch('/list');
    const data = await response.json();
    return data;
}

function appendTodo(todo) {
    const node = document.createElement("li");
    const textnode = document.createTextNode(todo.data);
    node.appendChild(textnode);
    ulTag.appendChild(node);
}
