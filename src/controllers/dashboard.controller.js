const usersModel = require('../models/users.model');
const tasksModel = require('../models/tasks.model');

const getDashboard = (req, res) => {
    const users = usersModel.getAllUsers();
    const tasks = tasksModel.getAllTasks();

    const tasksByStatus = {
        pendiente: 0,
        en_progreso: 0,
        completada: 0
    };

    const tasksByPriority = {
        baja: 0,
        media: 0,
        alta: 0
    };

    tasks.forEach((task) => {
        tasksByStatus[task.status] += 1;
        tasksByPriority[task.priority] += 1;
    });

    return res.status(200).json({
        totalUsers: users.length,
        activeUsers: users.filter((user) => user.active).length,
        inactiveUsers: users.filter((user) => !user.active).length,
        totalTasks: tasks.length,
        tasksByStatus,
        tasksByPriority,
        tasks
    });
};

module.exports = {
    getDashboard
};
