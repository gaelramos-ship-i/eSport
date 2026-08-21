const express = require('express')
const router = express.Router()
const { createTournament, updateTournament, deleteTournament, addTeam, getTournaments, getEquips, deleteEquip } = require('../controllers/tournamentController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/', authMiddleware, createTournament)
router.patch('/update/:id', authMiddleware, updateTournament)
router.delete('/deleteTournament/:id', authMiddleware, deleteTournament)
router.post('/:idTournament', authMiddleware, addTeam)
router.get('/', authMiddleware, getTournaments)
router.get('/:idTournament', authMiddleware, getEquips)
router.delete('/deleteEquip/:idEquip', authMiddleware, adminMiddleware, deleteEquip)

module.exports = router