const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new mongoose.Schema({
    firstName: { 
        type: String,
        trim:true
    },
    lastName:  { 
        type: String,
        trim:true
    },
    company:  { 
        type: String,
        unique: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        trim:true
    },
    phone:  { 
        type: Number,
        unique: true,
        trim:true
    },
    clientProjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]
},
{
    timestamps: true
});



const Client= mongoose.model('Client', clientSchema);

module.exports = Client;