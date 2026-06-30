const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Aquí se listarán los usuarios'
    });
});

router.post('/', (req, res) => {
    res.json({
        message: 'Aquí se creará un usuario'
    });
});

module.exports = router;