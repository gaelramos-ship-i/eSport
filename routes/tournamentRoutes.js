const express = require('express')
const router = express.Router()
const { createTournament, updateTournament, deleteTournament } = require('../controllers/tournamentController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, createTournament)
router.patch('/update/:id', authMiddleware, updateTournament)
router.delete('/delete/:id', authMiddleware, deleteTournament)

module.exports = router