

const router = require('express').Router();
const auth = require('../middlewares/auth');
const rbac = require('../middlewares/roles');
const { createUser, listUsers } = require('../controllers/users');

router.post('/',  auth, rbac('addUser'), createUser);
router.get('/',   auth, listUsers);

module.exports = router;
