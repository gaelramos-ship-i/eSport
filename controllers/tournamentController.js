const Tournament = require('../models/tournamentModel')
const Team = require('../models/teamModel')

/* US8 : Créer un tournoi
En tant qu’organisateur, je veux pouvoir créer un tournoi avec nom, jeu, date et règles, afin
d’organiser des compétitions. */

const createTournament = async (req, res) => {
    try {
        const { name, game, date, rules } = req.body

        if (!name || !game || !rules) {
            return res.status(400).json({ message: 'You must provide name, game, date, rules' })
        }

        const tournament = new Tournament({
            name,
            game,
            rules,
            date: date || undefined,
            organizer: req.user._id,
        })

        const newTournament = await tournament.save()
        res.status(201).json(newTournament)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* US9 : Modifier un tournoi
En tant qu’organisateur, je veux pouvoir modifier les détails d’un tournoi que j’ai créé, afin de
corriger ou mettre à jour les informations. */

const updateTournament = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id)
        if (tournament == null) {
            return res.status(404).json({ message: "Tournoi non trouvé" })
        }

        if (req.body.name != null) {
            tournament.name = req.body.name
        }

        if (req.body.game != null) {
            tournament.game = req.body.game
        }

        if (req.body.date != null) {
            tournament.date = req.body.date
        }

        if (req.body.rules != null) {
            tournament.rules = req.body.rules
        }

        const updateTournament = await tournament.save()
        res.json(updateTournament)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* US10 : Supprimer un tournoi
En tant qu’organisateur ou admin, je veux pouvoir supprimer un tournoi, afin de retirer un
événement annulé ou terminé. */

const deleteTournament = async (req, res) => {
    try {

        const tournament = await Tournament.findById(req.params.id)
        if (tournament == null) {
            return res.status(404).json({ message: "Tournoi non trouvé" })
        }
        await tournament.deleteOne()
        res.json({ message: "Le tournoi à été supprimé" })

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* US11 : Inscrire une équipe à un tournoi
En tant que joueur/capitaine, je veux pouvoir inscrire mon équipe à un tournoi, afin de
participer officiellement. */

const addTeam = async (req, res) => {
    try {

        const { idTournament } = req.params

        if (!idTournament) {
            return res.status(404).json({ message: "idTournament not found" })
        }

        const tournament = await Tournament.findById(idTournament)
        if (!tournament) {
            return res.status(404).json({ message: "Invalid Tournament" })
        }

        const team = await Team.findOne({creator: req.user._id})
        if (!team) {
            return res.status(404).json({ message: "Invalid Team" })
        }

        const idTeam = team._id
        const idTeamExist = tournament.equips.includes(idTeam)
        if(idTeamExist){
            return res.status(400).json({ message: 'This equip is already on this tournament'})
        }

        tournament.equips.push(idTeam)

        const updateTournament = await tournament.save()
        res.status(200).json(updateTournament)
    
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = { createTournament, updateTournament, deleteTournament, addTeam }