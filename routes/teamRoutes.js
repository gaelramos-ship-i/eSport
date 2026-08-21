const express = require('express')
const router = express.Router()
const { createTeam, joinTeam, deleteEquip, detailsEquip, manageEquipAdd, manageEquipDel } = require('../controllers/teamController')
const authMiddleware = require('../middlewares/authMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')

router.post('/', authMiddleware, createTeam)
router.patch('/join/:idTeam', authMiddleware, joinTeam)
router.delete('/deleteEquip/:idEquip', authMiddleware, adminMiddleware, deleteEquip)
router.get('/details/:idEquip', authMiddleware, detailsEquip)
router.patch('/manage/add/:idPlayer', authMiddleware, manageEquipAdd)
router.patch('/manage/delete/:idPlayer', authMiddleware, manageEquipDel)

module.exports = router