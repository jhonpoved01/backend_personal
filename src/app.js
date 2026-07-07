const express = require('express');

const usersRoutes = require('./routes/users.routes');
const tasksRoutes = require('./routes/tasks.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Servidor backend funcionando correctamente'
    });
});

app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor ejecutándose`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📡 Red: http://TU-IP:${PORT}`);
});
