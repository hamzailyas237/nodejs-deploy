
const brypt = require('bcrypt')
const userModel = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const todoModel = require('../models/todoSchema')

const authControllers = {
    signup: async (req, res) => {
        const { name, email, phone, password } = req.body

        if (!name || !email || !phone || !password) {
            res.status(400).json({
                message: 'Required fields are missing'
            })
            return
        }

        const hashedPassword = await brypt.hash(password, 10)
        const signupUser = {
            ...req.body,
            password: hashedPassword
        }

        userModel.findOne({ email }, (err, emailInUser) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            }
            else {
                if (emailInUser) {
                    res.status(400).json({
                        message: 'This email is already in use'
                    })
                }
                else {
                    userModel.create(signupUser, (err, user) => {
                        if (err) {
                            res.status(500).json({
                                message: 'Something went wrong'
                            })
                        }
                        else {
                            res.status(200).json({
                                message: 'User successfully signed up',
                                user
                            })
                        }
                    })
                }
            }
        })
    },

    login: (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(500).json({
                message: 'Required fields are missing'
            })
            return
        }

        userModel.findOne({ email }, async (err, user) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            }
            else {
                if (user) {
                    const isPasswordMatch = await brypt.compare(password, user.password)
                    const token = jwt.sign({ user }, process.env.JWT_KEY);

                    if (isPasswordMatch) {
                        res.status(200).json({
                            message: 'User logged in',
                            user,
                            token
                        })
                    }
                    else {
                        res.status(400).json({
                            message: 'email or password is incorrect'
                        })
                    }
                }
                else {
                    res.status(400).json({
                        message: 'email or password is incorrect'
                    })
                }
            }
        })
    },

    createTodos: (req, res) => {
        todoModel.create(req.body, (err, todo) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            }
            else {
                res.status(200).json({
                    message: 'Todo created',
                    todo
                })
            }
        })
    },

    getTodos: (req, res) => {
        todoModel.find({}, (err, todos) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            }
            else {
                res.status(200).json({
                    message: 'Get Todos',
                    todos
                })
            }
        })
    },

    updateTodo: (req, res) => {
        todoModel.findByIdAndUpdate(req.body.id, req.body, { new: true }, (err, updatedTodo) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            }
            else {
                res.status(200).json({
                    message: 'Todo Updated',
                    updatedTodo
                })
            }
        })
    },

    deleteTodo: (req, res) => {
        todoModel.findByIdAndDelete(req.params.id, (err, todo) => {
            if (err) {
                res.status(500).json({
                    message: 'Something went wrong'
                })
            }
            else {
                res.status(200).json({
                    message: 'Todo Deleted',
                    todo
                })
            }
        })
    }
}

module.exports = authControllers

