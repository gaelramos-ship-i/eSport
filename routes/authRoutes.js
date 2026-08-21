const express = require('express')
const router = express.Router()
const { register, login, updateProfil, updateRoles } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/register', register)
router.post('/login', login)
router.patch('/updateProfil', authMiddleware, updateProfil)
router.patch('/updateRoles/:idUser', authMiddleware, adminMiddleware, updateRoles)

module.exports = router