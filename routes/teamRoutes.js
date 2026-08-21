const express = require('express')
const router = express.Router()
const { createTeam, joinTeam, deleteEquip } = require('../controllers/teamController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/', authMiddleware, createTeam)
router.patch('/join/:idTeam', authMiddleware, joinTeam)
router.delete('/deleteEquip/:idEquip', authMiddleware, adminMiddleware, deleteEquip)

module.exports = router