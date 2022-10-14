let Project = require('../models/projectModel');
const mongoose = require('mongoose')



// Get All Projects
const getProjects = async ( req, res) => {
    const projects = await Project.find({}).sort({createdAt: -1})
    .populate({path:'owner', select:['firstName', 'lastName','email','phone','company' ]})
    .populate({path:'queue', select:['queueName']})
    .populate({path:'assignedTo', select:['firstName', 'lastName','email','phone','role' ]})

    res.status(200).json(projects)
}

// Get a single Project
const getSingleProject = async( req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Project'})
    }
    const project = await Project.findById(id)
    .populate({path:'owner', select:['firstName', 'lastName','email','phone','company' ]})
    .populate({path:'queue', select:['queueName']})
    .populate({path:'assignedTo', select:['firstName', 'lastName','email','phone','role' ]})

    if(!project){
        return res.status(404).json({error: 'No Such Project'})
    }

    res.status(200).json(project)
}


//Create a New Project
const createProject = async (req, res) => {
    const caseNumber = Math.floor(Math.random() * 1000000000);
    const { assignedTo, owner, status, severity, title,details,budget,queue} = req.body

   
    let emptyFields = []

    if(!title){
        emptyFields.push('Title')
    }
    if(!details){
        emptyFields.push('Details')
    }

    if(!severity){
        emptyFields.push('Severity')
    }
    if(!owner){
        emptyFields.push('Owner')
    }
    if(!budget){
        emptyFields.push('Budget')
    }
    if(!queue){
        emptyFields.push('Queue')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please Fill in all the Fields", emptyFields})
    }


    try {
        const project = await Project.create({caseNumber, assignedTo, owner, status, severity, title,details,budget, queue})
        res.status(200).json(project)
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}


//Delete a Project
const deleteProject = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Project'})
    }

    const project = await Project.findByIdAndDelete({_id: id})

    if(!project){
        return res.status(404).json({error: 'No Such Project'})
    }

    return res.status(200).json({message: 'Project Successfully Deleted'})
}

//Update a New Project
const updateProject = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Project'})
    }

    const project = await Project.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!project){
        return res.status(404).json({error: 'No Such Project'})
    }

    const updatedProject = await Project.findById(id)
    .populate({path:'owner', select:['firstName', 'lastName','email','phone','company' ]})
    .populate({path:'queue', select:['queueName']})
    .populate({path:'assignedTo', select:['firstName', 'lastName','email','phone','role' ]})

    return res.status(200).json({project:updatedProject, error: 'Project Successfully Updated'})
}


module.exports = {
    createProject,
    getProjects,
    getSingleProject,
    deleteProject,
    updateProject
}