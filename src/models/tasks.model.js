const database = require('../data/database');

const getAllTasks = () => {
    return database.tasks;
};

const getTaskById = (id) => {
    return database.tasks.find((task) => task.id === Number(id));
};

const createTask = (taskData) => {
    const nextId = database.tasks.length > 0
        ? Math.max(...database.tasks.map((task) => task.id)) + 1
        : 1;

    const newTask = {
        id: nextId,
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status || 'pendiente',
        priority: taskData.priority || 'media',
        assignedUsers: taskData.assignedUsers || [],
        createdAt: new Date().toISOString().split('T')[0]
    };

    database.tasks.push(newTask);
    return newTask;
};

const updateTask = (id, taskData) => {
    const task = getTaskById(id);

    if (!task) {
        return null;
    }

    task.title = taskData.title;
    task.description = taskData.description || '';
    task.status = taskData.status || 'pendiente';
    task.priority = taskData.priority || 'media';
    task.assignedUsers = taskData.assignedUsers || [];

    return task;
};

const deleteTask = (id) => {
    const taskIndex = database.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex === -1) {
        return null;
    }

    const deletedTasks = database.tasks.splice(taskIndex, 1);
    return deletedTasks[0];
};

const updateTaskStatus = (id, status) => {
    const task = getTaskById(id);

    if (!task) {
        return null;
    }

    task.status = status;
    return task;
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
};
