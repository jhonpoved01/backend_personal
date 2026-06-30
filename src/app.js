const express = require('express');

const usersRoutes = require('./routes/users.routes');
const tasksRoutes = require('./routes/tasks.routes');

const app = express();

const PORT = 3000;
const HOST = '0.0.0.0';

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Servidor backend funcionando correctamente'
    });
});

app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);

app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor ejecutándose`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📡 Red: http://TU-IP:${PORT}`);
});