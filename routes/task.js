
const router = require('express').Router();
const auth = require('../middlewares/auth');
const rbac = require('../middlewares/roles');
const { createTask, listTasks } = require('../controllers/tasks');

router.post('/',  auth, rbac('addTask'), createTask);
router.get('/',   auth, listTasks);

module.exports = router;
