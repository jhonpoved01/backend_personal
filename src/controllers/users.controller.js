const usersModel = require('../models/users.model');
const tasksModel = require('../models/tasks.model');

const validRoles = ['admin', 'usuario'];

const isValidRole = (role) => {
    return validRoles.includes(role);
};

const validateUserData = (userData, currentUserId = null) => {
    const role = userData.role || 'usuario';

    if (!userData.name) {
        return 'El nombre es obligatorio';
    }

    if (!userData.email) {
        return 'El email es obligatorio';
    }

    if (!isValidRole(role)) {
        return 'El rol debe ser admin o usuario';
    }

    if (userData.active !== undefined && typeof userData.active !== 'boolean') {
        return 'El estado active debe ser true o false';
    }

    const existingUser = usersModel.getUserByEmail(userData.email);

    if (existingUser && existingUser.id !== Number(currentUserId)) {
        return 'El email ya esta registrado';
    }

    return null;
};

const getUsers = (req, res) => {
    const users = usersModel.getAllUsers();

    res.status(200).json(users);
};

const createUser = (req, res) => {
    const validationError = validateUserData(req.body);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const newUser = usersModel.createUser(req.body);

    return res.status(201).json(newUser);
};

const getUserById = (req, res) => {
    const user = usersModel.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    return res.status(200).json(user);
};

const updateUser = (req, res) => {
    const user = usersModel.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    const validationError = validateUserData(req.body, req.params.id);

    if (validationError) {
        return res.status(400).json({
            message: validationError
        });
    }

    const updatedUser = usersModel.updateUser(req.params.id, req.body);

    return res.status(200).json(updatedUser);
};

const deleteUser = (req, res) => {
    const deletedUser = usersModel.deleteUser(req.params.id);

    if (!deletedUser) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    return res.status(204).send();
};

const updateUserStatus = (req, res) => {
    if (typeof req.body.active !== 'boolean') {
        return res.status(400).json({
            message: 'El estado active debe ser true o false'
        });
    }

    const updatedUser = usersModel.updateUserStatus(req.params.id, req.body.active);

    if (!updatedUser) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    return res.status(200).json(updatedUser);
};

const getUserTasks = (req, res) => {
    const user = usersModel.getUserById(req.params.userId);

    if (!user) {
        return res.status(404).json({
            message: 'Usuario no encontrado'
        });
    }

    const tasks = tasksModel.getTasksByUserId(req.params.userId);

    return res.status(200).json(tasks);
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    updateUserStatus,
    getUserTasks
};
