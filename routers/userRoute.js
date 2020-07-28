const router = require('express').Router();
const {login, register, getAllUsers} = require('../controllers/userController')

// registeration route
// http://localhost:4000/api/users/register
router.post('/register', register)

// loging route
// http://localhost:4000/api/users/login
router.post('/login', login)

// get All Users
router.get('/all', getAllUsers)


module.exports = router