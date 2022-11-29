// var input = document.getElementById("inputID");
// var listTodo = document.getElementById("tasks");
// var todo = [];
// function addTodo(){
//     todo.push(input.value);
//     var todoItem = todo.map((item) =>{
//         return `<li>
//         <span>${item}</span>
//         <i class="fa fa-check"></i>
//         <i class="fa fa-trash"></i>
//     </li>`
//     })
//     input.value = "";
    
//     listTodo.innerHTML = todoItem;
// }

var btnAddTasks = document.querySelector("button");
var taskName = document.querySelector("#inputID");

var tasks = getTaskFromLocalStorage()
renderTasks(tasks);

btnAddTasks.addEventListener("click", function() {
    if(!taskName.value) {
        alert("Vui lòng nhập công việc")
        return false;
    }
    var taskId = this.getAttribute('id')
    var tasks = getTaskFromLocalStorage();
    var task = {name: taskName.value}
    if (taskId == 0 || taskId) {
        tasks[taskId] = task;
        this.removeAttribute('id');
    } else {
        tasks.push(task)
    }

    // tasks.push({name: taskName.value})
    taskName.value = ""

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks(tasks)
})

function editTask(id) {
    var tasks = getTaskFromLocalStorage()
    if(tasks.length > 0) {
        taskName.value = tasks[id].name
        btnAddTasks.setAttribute('id', id)
    }
}

function deleteTask(id) {
    if(confirm("Bạn chắc chắn muốn xóa không ?")) {
        var tasks = getTaskFromLocalStorage()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorage())
    }
}



function renderTasks(tasks = []) {
    let inputID = `<ul>`
    tasks.forEach((element, index) => {
        inputID += `
        <li>
            <span>${element.name}</span>
            <i onclick="editTask(${index})" class="fa fa-wrench"></i>
            <i onclick="deleteTask(${index})" class="fa fa-trash"></i>
        </li>
        `    
    });
    inputID += `</ul>`
    document.querySelector('#tasks').innerHTML = inputID
}

function getTaskFromLocalStorage() {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
}





