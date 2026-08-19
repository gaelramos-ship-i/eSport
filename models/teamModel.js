const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        creator: {
            type: mongoose.Schema.ObjectId,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Team', teamSchema)