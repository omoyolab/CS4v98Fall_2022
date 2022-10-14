const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const queueSchema = new Schema({
    queueName:{
        type: String,
        trim: true

    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
});

const Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;