const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    caseNumber:{
        type: Number,
        required: true,
        unique: true,
        trim:true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type: String,
        default:"Not Assigned Yet"
    },
    severity:{
        type:String,
        required: true
    },
    title:{
        type:String,
        required: true,
        trim:true
    },
    details:{
        type:String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Client'
    
    },
    budget:{
        type:Number,
        required: true
    },
    queue: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Queue'
    }
},{
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;