const mongoose = require('mongoose')


var historySchema = new mongoose.Schema({

    users: [
        {

            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    logs: {
        type: String,

    }


}, { timestamps: true })

module.exports = mongoose.model("History", historySchema)