const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Aquí se listarán las tareas'
    });
});

router.post('/', (req, res) => {
    res.json({
        message: 'Aquí se creará una tarea'
    });
});

module.exports = router;