const express = require('express')
const router = express.Router()
const { createTeam, setParticipants } = require('../controllers/teamController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, createTeam)
router.patch('/join/:idTeam', authMiddleware, setParticipants)

module.exports = router