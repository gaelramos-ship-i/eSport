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

module.exports = { createTeam }