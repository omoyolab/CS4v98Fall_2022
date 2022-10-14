let Archive = require('../models/archiveModel')
const mongoose = require('mongoose')


// Get All Archive
const getArchives = async ( req, res) => {
    const archive = await Archive.find({}).sort({createdAt: -1})

    res.status(200).json(archive)
}

// Get a single Archive
const getSingleArchive= async( req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Archive Does not Exist'})
    }
    const archive = await Archive.findById(id)

    if(!archive){
        return res.status(404).json({error: 'Archive Does not Exist'})
    }

    res.status(200).json(archive)
}


//Create a New Archive
const createArchive = async (req, res) => {
    const {project} = req.body

    try {
        const archive = await Archive.create({project})
        res.status(200).json(archive)
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}


//Delete an Archive
const deleteArchive = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Archive Does not Exist'})
    }

    const archive = await Archive.findByIdAndDelete({_id: id})

    if(!archive){
        return res.status(404).json({error: 'Archive Does not Exist'})
    }

    return res.status(200).json({message: 'Archive Successfully Deleted'})
}

//Update a Archive
const updateArchive = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Archive Does not Exist'})
    }

    const archive = await Archive.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!archive){
        return res.status(404).json({error: 'Archive Does not Exist'})
    }

    return res.status(200).json({error: 'Archive Successfully Updated'})
}















module.exports = {
    createArchive,
    getArchives,
    getSingleArchive,
    updateArchive,
    deleteArchive
}