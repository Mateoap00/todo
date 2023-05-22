// GET request al servidor PHP en localhost:9000/list.php
// para obtener las tareas registradas en la tabla 'tasks' de la base de datos 'todo'.
const getTasks = () => {
    return fetch("http://localhost:9000/list.php")
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}. Check network file: list.php.`);
            }
        })
        .then((data) => {
            const tasks = data;
            return tasks;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

// POST request al servidor PHP en localhost:9000/insert.php
// para agregar una nueva tarea en la tabla 'tasks' de la base de datos 'todo'.
const addTask = (task) => {
    return fetch("http://localhost:9000/insert.php", { method: 'POST', body: JSON.stringify(task) })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}. Check network file: insert.php.`);
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

// POST request al servidor PHP en localhost:9000/update.php
// para actualizar una tarea ya registrada en la tabla 'tasks' de la base de datos 'todo'.
const updateTask = (task) => {
    return fetch("http://localhost:9000/update.php", { method: 'POST', body: JSON.stringify(task) })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}. Check network file: update.php.`);
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

// POST request al servidor PHP en localhost:9000/change-status.php
// para actualizar el estado de pendiente a realizada o viceversa de 
// una tarea registrada en la tabla 'tasks' de la base de datos 'todo'.
const changeStatus = (task) => {
    return fetch("http://localhost:9000/change-status.php", { method: 'POST', body: JSON.stringify(task) })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}. Check network file: change-status.php.`);
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

// GET request al servidor PHP en localhost:9000/delete.php
// para eliminar una tarea en la tabla 'tasks' de la base de datos 'todo'.
const deleteTask = (id) => {
    return fetch(`http://localhost:9000/delete.php?id=${id}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(`Request failed with status ${response.status}. Check network file: delete.php.`);
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

export { getTasks, addTask, updateTask, deleteTask, changeStatus };