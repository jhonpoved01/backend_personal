const tasksModel = require('../models/tasks.model');
const usersModel = require('../models/users.model');

const validStatuses = ['pendiente', 'en_progreso', 'completada'];
const validPriorities = ['baja', 'media', 'alta'];

const hasDuplicatedValues = (values) => {
    return new Set(values).size !== values.length;
};

const validateTaskData = (taskData) => {
    const status = taskData.status || 'pendiente';
    const priority = taskData.priority || 'media';

    if (!taskData.title) {
        return 'El título es obligatorio';
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

const validateUserIds = (userIds) => {
    if (!Array.isArray(userIds)) {
        return 'userIds debe ser un arreglo';
    }

    if (userIds.length === 0) {
        return 'userIds no debe estar vacío';
    }

    if (hasDuplicatedValues(userIds)) {
        return 'userIds no debe tener usuarios duplicados';
    }

    return null;
};

const assignUsersToTask = (req, res) => {
    const task = tasksModel.getTaskById(req.params.taskId);

    if (!task) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    const validationError = validateUserIds(req.body.userIds);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const missingUserId = req.body.userIds.find((userId) => {
        return !usersModel.getUserById(userId);
    });

    if (missingUserId) {
        return res.status(404).json({
            message: `Usuario con id ${missingUserId} no encontrado`
        });
    }

    const updatedTask = tasksModel.assignUsersToTask(req.params.taskId, req.body.userIds);

    return res.status(200).json(updatedTask);
};

const getTaskUsers = (req, res) => {
    const task = tasksModel.getTaskById(req.params.taskId);

    if (!task) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    const assignedUsers = task.assignedUsers.map((userId) => {
        return usersModel.getUserById(userId);
    }).filter(Boolean);

    return res.status(200).json(assignedUsers);
};

const removeUserFromTask = (req, res) => {
    const task = tasksModel.getTaskById(req.params.taskId);

    if (!task) {
        return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    }

    const user = usersModel.getUserById(req.params.userId);

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    const updatedTask = tasksModel.removeUserFromTask(req.params.taskId, req.params.userId);

    if (!updatedTask) {
        return res.status(404).json({
            message: 'El usuario no está asignado a esta tarea'
        });
    }

    return res.status(200).json({
        message: 'Usuario removido de la tarea correctamente',
        task: updatedTask
    });
};

const filterTasks = (req, res) => {
    const { userId, status, priority } = req.query;

    if (userId && !usersModel.getUserById(userId)) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
            message: 'El estado debe ser pendiente, en_progreso o completada'
        });
    }

    if (priority && !validPriorities.includes(priority)) {
        return res.status(400).json({
            message: 'La prioridad debe ser baja, media o alta'
        });
    }

    const filteredTasks = tasksModel.filterTasks({
        userId,
        status,
        priority
    });

    return res.status(200).json(filteredTasks);
};

module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus,
    assignUsersToTask,
    getTaskUsers,
    removeUserFromTask,
    filterTasks
};
