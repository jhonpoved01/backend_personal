const database = require('../data/database');

const getAllUsers = () => {
    return database.users;
};

const getUserById = (id) => {
    return database.users.find((user) => user.id === Number(id));
};

const getUserByEmail = (email) => {
    return database.users.find((user) => user.email === email);
};

const createUser = (userData) => {
    const nextId = database.users.length > 0
        ? Math.max(...database.users.map((user) => user.id)) + 1
        : 1;

    const newUser = {
        id: nextId,
        name: userData.name,
        email: userData.email,
        role: userData.role || 'usuario',
        active: userData.active ?? true
    };

    database.users.push(newUser);
    return newUser;
};

const updateUser = (id, userData) => {
    const user = getUserById(id);

    if (!user) {
        return null;
    }

    user.name = userData.name;
    user.email = userData.email;
    user.role = userData.role || user.role;
    user.active = userData.active ?? user.active;

    return user;
};

const deleteUser = (id) => {
    const userIndex = database.users.findIndex((user) => user.id === Number(id));

    if (userIndex === -1) {
        return null;
    }

    const deletedUsers = database.users.splice(userIndex, 1);
    return deletedUsers[0];
};

const updateUserStatus = (id, active) => {
    const user = getUserById(id);

    if (!user) {
        return null;
    }

    user.active = active;
    return user;
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus
};
