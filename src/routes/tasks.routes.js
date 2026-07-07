const express = require('express');
const tasksController = require('../controllers/tasks.controller');

const router = express.Router();

router.get('/', tasksController.getTasks);
router.post('/', tasksController.createTask);
router.get('/filter', tasksController.filterTasks);
router.post('/:taskId/assign', tasksController.assignUsersToTask);
router.get('/:taskId/users', tasksController.getTaskUsers);
router.delete('/:taskId/users/:userId', tasksController.removeUserFromTask);
router.get('/:id', tasksController.getTaskById);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);
router.patch('/:id/status', tasksController.updateTaskStatus);

module.exports = router;
