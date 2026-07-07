const tasksModel = require('../models/tasks.model');

const validStatuses = ['pendiente', 'en_progreso', 'completada'];
const validPriorities = ['baja', 'media', 'alta'];

const hasDuplicatedValues = (values) => {
    return new Set(values).size !== values.length;
};

const validateTaskData = (taskData) => {
    const status = taskData.status || 'pendiente';
    const priority = taskData.priority || 'media';

    if (!taskData.title) {
        return 'El titulo es obligatorio';
    }

    if (!validStatuses.includes(status)) {
        return 'El estado debe ser pendiente, en_progreso o completada';
    }

    if (!validPriorities.includes(priority)) {
        return 'La prioridad debe ser baja, media o alta';
    }

    if (taskData.assignedUsers !== undefined && !Array.isArray(taskData.assignedUsers)) {
        return 'assignedUsers debe ser un arreglo';
    }

    if (Array.isArray(taskData.assignedUsers) && hasDuplicatedValues(taskData.assignedUsers)) {
        return 'assignedUsers no debe tener usuarios duplicados';
    }

    return null;
};

const getTasks = (req, res) => {
    const tasks = tasksModel.getAllTasks();

    res.status(200).json(tasks);
};

const createTask = (req, res) => {
    const validationError = validateTaskData(req.body);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const newTask = tasksModel.createTask(req.body);

    return res.status(201).json(newTask);
};

const getTaskById = (req, res) => {
    const task = tasksModel.getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    return res.status(200).json(task);
};

const updateTask = (req, res) => {
    const task = tasksModel.getTaskById(req.params.id);

    if (!task) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    const validationError = validateTaskData(req.body);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const updatedTask = tasksModel.updateTask(req.params.id, req.body);

    return res.status(200).json(updatedTask);
};

const deleteTask = (req, res) => {
    const deletedTask = tasksModel.deleteTask(req.params.id);

    if (!deletedTask) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    return res.status(204).send();
};

const updateTaskStatus = (req, res) => {
    if (!validStatuses.includes(req.body.status)) {
        return res.status(400).json({
            message: 'El estado debe ser pendiente, en_progreso o completada'
        });
    }

    const updatedTask = tasksModel.updateTaskStatus(req.params.id, req.body.status);

    if (!updatedTask) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    return res.status(200).json(updatedTask);
};

module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
};
