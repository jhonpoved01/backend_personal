const getTasks = (req, res) => {
    res.json({
        message: 'Aqui se listaran las tareas'
    });
};

const createTask = (req, res) => {
    res.json({
        message: 'Aqui se creara una tarea'
    });
};

const getTaskById = (req, res) => {
    res.json({
        message: `Aqui se consultara la tarea con id ${req.params.id}`
    });
};

const updateTask = (req, res) => {
    res.json({
        message: `Aqui se actualizara la tarea con id ${req.params.id}`
    });
};

const deleteTask = (req, res) => {
    res.json({
        message: `Aqui se eliminara la tarea con id ${req.params.id}`
    });
};

const updateTaskStatus = (req, res) => {
    res.json({
        message: `Aqui se actualizara el estado de la tarea con id ${req.params.id}`
    });
};

module.exports = {
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    updateTaskStatus
};
