const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        game: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date
        },
        rules: {
            type: String,
            required: true,
            trim: true
        },
        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Tournament', tournamentSchema)