const router = require('express').Router();
const { createTask, viewTask, updateTask, deleteTask } = require('../controller/taskController');
const { viewTasks, createAndUpdateTask, admin } = require('../middleware/authenticate');


router.post('/task', createAndUpdateTask, createTask)
router.put('/updateTask/:id', createAndUpdateTask, updateTask)
router.get('/task', viewTasks, viewTask )
router.delete('/task/:id', admin, deleteTask )

module.exports = router
