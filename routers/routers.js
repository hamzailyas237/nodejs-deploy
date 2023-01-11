
const router = require('express').Router()
const { signup, login, createTodos, getTodos, updateTodo, deleteTodo } = require('../controllers/authController')
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/signup', signup)
router.post('/login', login)
router.post('/todos', authMiddleware, createTodos)
router.get('/todos', authMiddleware, getTodos)
router.put('/todos', authMiddleware, updateTodo)
router.delete('/todos/:id', authMiddleware, deleteTodo)

module.exports = router