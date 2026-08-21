const Tournament = require('../models/tournamentModel')
const Team = require('../models/teamModel')

/* US8 : Créer un tournoi
En tant qu’organisateur, je veux pouvoir créer un tournoi avec nom, jeu, date et règles, afin
d’organiser des compétitions. */

const createTournament = async (req, res) => {
    try {
        const { name, game, date, rules } = req.body

        if (!name || !game || date || !rules) {
            return res.status(400).json({ message: 'You must provide name, game, rules' })
        }

        const tournament = new Tournament({
            name,
            game,
            date,
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

        if (tournament.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not the organizer of this tournament"
            })
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

        if (tournament.organizer.toString() || tournament.admin.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not the organizer or admin of this tournament"
            })
        }

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
        const { idTeam } = req.body

        const tournament = await Tournament.findById(idTournament)
        if (!tournament) {
            return res.status(404).json({ message: "Invalid Tournament" })
        }

        const team = await Team.findById(idTeam)
        if (!team) {
            return res.status(404).json({ message: "Invalid Team" })
        }

        let idTeamExist = false

        for (const tournamentTeam of tournament.equips) {
            if (tournamentTeam.toString() === team._id.toString()) {
                idTeamExist = true
                break
            }
        }

        if (idTeamExist) {
            return res.status(400).json({ message: "This team is already on this tournament" })
        }

        tournament.equips.push(team._id)

        const updatedTournament = await tournament.save()
        res.status(200).json(updatedTournament)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getTournaments = async (req, res) => {
    try {

        const tournament = await Tournament.find({ status : true })
        res.status(200).json(tournament)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* US13 : Voir les équipes inscrites à un tournoi
En tant qu’organisateur, je veux voir la liste des équipes inscrites à mes tournois, afin de
suivre la participation. */

const getEquips = async (req, res) => {
    try {
        const { idTournament } = req.params
        if (!idTournament) {
            return res.status(400).json({
                message: "idTournament is required"
            })
        }

        const tournament = await Tournament.findById(idTournament)
            .populate('equips')

        if (!tournament) {
            return res.status(404).json({ message: "Invalid Tournament" })
        }

        if (tournament.organizer.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not the organizer of this tournament" })
        }

        return res.status(200).json({ equips: tournament.equips })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

/* US15 : Voir les statistiques de participation
En tant qu’administrateur, je veux voir le nombre d’équipes inscrites à chaque tournoi, afin
d’analyser la fréquentation. */

const countTournament = async (req, res) => {
    try {
        const { idTournament } = req.params
        if (!idTournament) {
            return res.status(400).json({ message: "idTournament is required" })
        }

        const tournament = await Tournament.findById(idTournament)
        if (!tournament) {
            return res.status(404).json({ message: "Invalid Tournament" })
        }

        const count = tournament.equips ? tournament.equips.length : 0

        return res.status(200).json({ idTournament, count})

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

/* US18 : Consulter mes inscriptions à des tournois
En tant que joueur, je veux voir la liste des tournois auxquels mon équipe est inscrite, afin de
gérer mon calendrier. */

const getTournamentByTeam = async (req, res) => {
    try {
        const { idTeam } = req.params
        if (!idTeam) {
            return res.status(400).json({ message: "idTeam is required" })
        }

        const team = await Team.findById(idTeam)
        if (!team) {
            return res.status(404).json({ message: "Invalid Team" })
        }

        const tournaments = await Tournament.find({ equips: idTeam })
        return res.status(200).json(tournaments)

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = { createTournament, updateTournament, deleteTournament, addTeam, getTournaments, getEquips, countTournament, getTournamentByTeam }