const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }

},{
    timestamps: true
});

const Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;