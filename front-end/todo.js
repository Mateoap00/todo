// Importa los request de 'tasksService.js' para obtener las tareas registradas, agregar una nueva tarea, actualizar una tarea ya
// registrada, cambiar el estatus de una tarea y eliminar una tarea registrada.
import { getTasks, addTask, updateTask, deleteTask, changeStatus } from "./tasksService.js";

// Elementos DOM.
const titleForm = document.getElementById('titleForm');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const dateInput = document.getElementById('date');
const tasksTable = document.getElementById('tasksTable');
const tbody = document.getElementById('tasksTableBody');
const body = document.body;
const submitBtn = document.getElementById('submitBtn');

// Mostrar mensajes o errores en la aplicación en un dialog.
const showMessages = (title, msg, type) => {
    const notificationContainer = document.getElementById('notificationContainer');
    const toastElement = document.querySelector('.toast');
    const toast = new bootstrap.Toast(toastElement);
    const msgTitle = document.getElementById('msgTitle');
    const msgP = document.getElementById('msgP');
    const acceptMsgBtn = document.getElementById('acceptMsgBtn');

    msgTitle.innerHTML = title;
    msgP.innerHTML = msg;
    type === 'success'
        ? notificationContainer.setAttribute('class', 'toast align-items-center text-white okay')
        : notificationContainer.setAttribute('class', 'toast align-items-center text-white error');
    type === 'success'
        ? acceptMsgBtn.setAttribute('class', 'btn btn-success')
        : acceptMsgBtn.setAttribute('class', 'btn btn-danger');

    toast.show();
    acceptMsgBtn.addEventListener('click', function () {
        msgTitle.innerHTML = '';
        msgP.innerHTML = '';
        toast.hide();
    });
}

// Completar el formulario con la información de una tarea para editarla.
const fillUpdateForm = (task) => {
    titleForm.innerHTML = 'Actualizar Tarea';
    const { id, name, description, date } = task;
    const idDiv = document.getElementById('idDiv');
    idDiv.innerHTML = id;
    nameInput.value = name;
    descriptionInput.value = description;
    dateInput.value = date;

    submitBtn.removeEventListener('click', addNewTask);
    submitBtn.addEventListener('click', updateATask);
    submitBtn.innerHTML = 'Actualizar';
}

// Limpiar la tabla de tareas guardadas.
const clearTasksTable = () => {
    const tasks = document.getElementsByClassName('tasks-data');
    const arrayTasks = [...tasks];
    arrayTasks.map((task) => task.remove());
}

// Limpiar los inputs del formulario.
const clearFormInputs = () => {
    nameInput.value = '';
    descriptionInput.value = '';
    dateInput.value = '';
}

// Llenar la tabla de tareas con la información de las tareas registradas en la base de datos.
const renderTasks = () => {
    getTasks()
        .then((tasks) => {
            clearTasksTable();
            tasks.forEach((task) => {
                const newRow = document.createElement('tr');
                for (let prop in task) {
                    if (prop != 'id' && prop != 'status') {
                        const newCol = document.createElement('td');
                        newCol.setAttribute('class', 'tasks-data');
                        newCol.innerHTML = task[prop];
                        newRow.appendChild(newCol);
                    }
                    if (prop == 'status') {
                        const newCol = document.createElement('td');
                        newCol.setAttribute('class', 'tasks-data');
                        const strong = document.createElement('strong');
                        strong.innerHTML = task[prop];
                        if (task[prop] == 'PENDIENTE') {
                            strong.setAttribute('class', 'text-danger');
                        } else {
                            strong.setAttribute('class', 'text-success');
                        }
                        newCol.appendChild(strong);
                        newRow.appendChild(newCol);

                    }
                }

                const updateCol = document.createElement('td');
                updateCol.setAttribute('class', 'tasks-data');
                const updateBtn = document.createElement('button');
                updateBtn.setAttribute('class', 'btn btn-primary');
                updateBtn.innerHTML = 'Actualizar';
                updateBtn.addEventListener('click', () => {
                    fillUpdateForm(task);
                });
                updateCol.appendChild(updateBtn);

                const deleteCol = document.createElement('td');
                deleteCol.setAttribute('class', 'tasks-data');
                const deleteBtn = document.createElement('button');
                deleteBtn.setAttribute('class', 'btn btn-danger');
                deleteBtn.innerHTML = 'Eliminar';
                deleteBtn.addEventListener('click', () => {
                    confirmDelete(task);
                });
                deleteCol.appendChild(deleteBtn);

                const changeStatusCol = document.createElement('td');
                changeStatusCol.setAttribute('class', 'tasks-data');
                const changeStatusBtn = document.createElement('button');
                changeStatusBtn.setAttribute('class', 'btn btn-dark');
                if (task.status == 'PENDIENTE') {
                    changeStatusBtn.innerHTML = 'Marcar como realizada';
                } else {
                    changeStatusBtn.innerHTML = 'Marcar como pendiente';
                }
                changeStatusBtn.addEventListener('click', () => {
                    changeTaskStatus(task);
                });
                changeStatusCol.appendChild(changeStatusBtn);

                newRow.appendChild(changeStatusCol);
                newRow.appendChild(updateCol);
                newRow.appendChild(deleteCol);

                tbody.appendChild(newRow);
                tasksTable.appendChild(tbody);
            });
        })
        .catch(() => {
            showMessages('Error', 'Fallo al obtener la lista de tareas.', 'fail');
        });
}

// Agregar una nueva tarea.
const addNewTask = () => {
    const task = {
        name: nameInput.value,
        description: descriptionInput.value,
        date: dateInput.value
    }
    addTask(task)
        .then(() => {
            showMessages('Aviso', `Tarea "${task.name}" registrada para la fecha ${task.date}.`, 'success');
            clearFormInputs();
            setTimeout(() => {
                renderTasks();
            }, 100);
        })
        .catch(() => {
            showMessages('Error', 'Fallo al registrar la tarea.', 'fail');
        })
}

// Actualizar una tarea con nueva información.
const updateATask = () => {
    const idDiv = document.getElementById('idDiv');
    const task = {
        id: Number(idDiv.innerHTML),
        name: nameInput.value,
        description: descriptionInput.value,
        date: dateInput.value
    }

    updateTask(task)
        .then(() => {
            showMessages('Aviso', `Tarea "${task.name}" actualizada para la fecha ${task.date}.`, 'success');
            idDiv.innerHTML = '';
            clearFormInputs();
            submitBtn.removeEventListener('click', updateATask);
            submitBtn.addEventListener('click', addNewTask);
            titleForm.innerHTML = 'Agregar Tarea';
            submitBtn.innerHTML = 'Agregar';
            setTimeout(() => {
                renderTasks();
            }, 100);
        })
        .catch(() => {
            showMessages('Error', 'Fallo al actualizar la tarea.', 'fail');
        });
}

// Marcar una tarea como realizada o pendiente.
const changeTaskStatus = (task) => {
    if (task.status == 'PENDIENTE') {
        changeStatus(task)
            .then(() => {
                showMessages('Aviso', `Tarea "${task.name}" marcada como realizada.`, 'success');
                setTimeout(() => {
                    renderTasks();
                }, 100);
            })
            .catch(() => {
                showMessages('Error', 'Fallo al marcar la tarea como realizada.', 'fail');
            });
    } else {
        changeStatus(task)
            .then(() => {
                showMessages('Aviso', `Tarea "${task.name}" marcada como pendiente.`, 'success');
                setTimeout(() => {
                    renderTasks();
                }, 100);
            })
            .catch(() => {
                showMessages('Error', 'Fallo al marcar la tarea como pendiente.', 'fail');
            });
    }
}

// Eliminar una tarea registrada.
const deleteATask = () => {
    const deleteContainer = document.getElementById('deleteContainer');
    const toast = new bootstrap.Toast(deleteContainer);
    const taskToDelete = document.getElementById('taskToDelete');
    const doDltBtn = document.getElementById('doDltBtn');
    const idDiv = document.getElementById('idDiv');
    const id = Number(idDiv.innerHTML);

    deleteTask(id)
        .then(() => {
            toast.hide();
            idDiv.innerHTML = '';
            taskToDelete.innerHTML = '';
            doDltBtn.removeEventListener('click', deleteATask);
            showMessages('Aviso', 'Tarea eliminada correctamente.', 'success');
            setTimeout(() => {
                renderTasks();
            }, 100);
        })
        .catch(() => {
            toast.hide();
            idDiv.innerHTML = '';
            taskToDelete.innerHTML = '';
            showMessages('Error', 'Fallo al eliminar la tarea.', 'fail');
        });
}

// Mostrar mensaje para verificar que se quiere eliminar una tarea.
const confirmDelete = (task) => {
    const deleteContainer = document.getElementById('deleteContainer');
    const toast = new bootstrap.Toast(deleteContainer);
    const taskToDelete = document.getElementById('taskToDelete');
    const doDltBtn = document.getElementById('doDltBtn');
    const cancelDltBtn = document.getElementById('cancelDltBtn');
    const idDiv = document.getElementById('idDiv');

    idDiv.innerHTML = task.id;

    deleteContainer.setAttribute('class', 'toast align-items-center text-white');
    taskToDelete.innerHTML = task.name;

    toast.show();

    doDltBtn.addEventListener('click', deleteATask);

    cancelDltBtn.addEventListener('click', () => {
        idDiv.innerHTML = '';
        taskToDelete.innerHTML = '';
        doDltBtn.removeEventListener('click', deleteATask);
        toast.hide();
    });
}

body.addEventListener('load', renderTasks());
submitBtn.addEventListener('click', addNewTask);
