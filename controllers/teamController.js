const Team = require('../models/teamModel')

/* US5 : Créer une équipe
En tant que joueur, je veux pouvoir créer ma propre équipe, afin de participer à des
compétitions avec mes coéquipiers. */

const createTeam = async (req, res) => {
    try {
        const { name, description, capacity } = req.body

        if (!name || !description || !capacity) {
            return res.status(400).json({ error: 'You must provide name, description and capacity' })
        }

        const team = new Team({
            name,
            description,
            capacity,
            creator: req.user._id,
        })

        const newTeam = await team.save()
        res.status(201).json(newTeam)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* US6 : Rejoindre une équipe
En tant que joueur, je veux pouvoir rejoindre une équipe existante, afin de jouer en groupe. */

const joinTeam = async (req, res) => {
    try {
        const {idTeam} = req.params

        if(!idTeam){
            return res.status(404).json({ message: "idTeam not found"})
        }
        
        const team = await Team.findById(idTeam)
        if(!team){
            return res.status(404).json({ message: "Invalid Team"})
        }

        if(team.registered.length >= team.capacity){
            return res.status(401).json({ message: "Player capacity reached"})
        }

        const idUser = req.user._id
        const idUserExist = team.registered.includes(idUser)
        if(idUserExist){
            return res.status(400).json({ message: 'This register is already on this team'})
        }

        team.registered.push(idUser)

        const updateTeam = await team.save()
        res.status(200).json(updateTeam)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/* US7 : Gérer les membres de mon équipe
En tant que capitaine, je veux pouvoir ajouter ou retirer des joueurs de mon équipe, afin
d’organiser efficacement mes membres. */

module.exports = { createTeam, joinTeam}