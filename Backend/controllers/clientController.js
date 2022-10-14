let Client = require('../models/clientModel')
const mongoose = require('mongoose')



// Get All Clients
const getClients = async ( req, res) => {
    const clients = await Client.find({}).sort({createdAt: -1})
    .populate('clientProjects')

    res.status(200).json(clients)
}

// Get a single Client
const getSingleClient = async( req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Client'})
    }
    const client= await Client.findById(id)
    .populate('clientProjects')

    if(!client){
        return res.status(404).json({error: 'No Such Client'})
    }

    res.status(200).json(client)
}


//Create a New Client
const createClient = async (req, res) => {
    const { firstName, lastName, company, email, phone } = req.body

    let emptyFields = []

    if(!firstName){
        emptyFields.push('FirstName')
    }
    if(!lastName){
        emptyFields.push('LastName')
    }

    if(!company){
        emptyFields.push('Company')
    }
    if(!email){
        emptyFields.push('Email')
    }
    if(!phone){
        emptyFields.push('Phone')
    }
   
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please Fill in all the Fields", emptyFields})
    }


    try {
        const client = await Client.create({firstName, lastName, company, email, phone })
        res.status(200).json(client)
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}


//Delete a Client
const deleteClient = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Client'})
    }

    const client = await Client.findByIdAndDelete({_id: id})

    if(!client){
        return res.status(404).json({error: 'No Such Client'})
    }

    return res.status(200).json({message: 'Client Successfully Deleted'})
}

//Update a Client
const updateClient = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Client'})
    }

    const client = await Client.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!client){
        return res.status(404).json({error: 'No Such Client'})
    }

    return res.status(200).json({error: 'Client Successfully Updated'})
}






module.exports = {
    createClient,
    getClients,
    getSingleClient,
    deleteClient,
    updateClient
}