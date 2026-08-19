const express = require('express')
const router = express.Router()
const { register, login, update } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.patch('/update', authMiddleware, update)

module.exports = router