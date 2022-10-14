let Queue = require('../models/queueModel')
const mongoose = require('mongoose')



// Get All Queues
const getQueues = async ( req, res) => {
    const queues = await Queue.find({}).sort({createdAt: -1})

    res.status(200).json(queues)
}

// Get a single Queue
const getSingleQueue= async( req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Queue'})
    }
    const queue = await Queue.findById(id)

    if(!queue){
        return res.status(404).json({error: 'No Such Queue'})
    }

    res.status(200).json(queue)
}

// // Add member to a Queue
// const addMembertoQueue = async (req, res) => {
//     const{ id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: 'No Such Queue'})
//     }

//     const queue = await Queue.findByIdAndUpdate({_id: id}, {
//         ...req.body
//     })

//     if(!queue){
//         return res.status(404).json({error: 'No Such Queue'})
//     }

//     return res.status(200).json({error: 'Queue Successfully Updated'})
// }

//Create a New Queue
const createQueue = async (req, res) => {
    const {queueName, members} = req.body

    try {
        const queue = await Queue.create({queueName, members})
        res.status(200).json(queue)
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}


//Delete a Queue
const deleteQueue = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Queue'})
    }

    const queue = await Queue.findByIdAndDelete({_id: id})

    if(!queue){
        return res.status(404).json({error: 'No Such Queue'})
    }

    return res.status(200).json({message: 'Queue Successfully Deleted'})
}

//Update a Queue
const updateQueue = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Queue'})
    }

    const queue = await Queue.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!queue){
        return res.status(404).json({error: 'No Such Queue'})
    }

    return res.status(200).json({error: 'Queue Successfully Updated'})
}










module.exports = {
    createQueue,
    getQueues,
    getSingleQueue,
    updateQueue,
    deleteQueue
}