const express = require('express')
const{
    createQueue,
    getQueues,
    getSingleQueue,
    updateQueue,
    deleteQueue

} =  require('../controllers/queueController')

const router = express.Router()

// Get All Queues
router.get('/', getQueues)

// Get a single Queues
router.get('/:id', getSingleQueue)

//Create a New Queue
router.post('/', createQueue)


//Delete a Queue
router.delete('/:id', deleteQueue)

//Update a  Queue
router.patch('/:id', updateQueue)



module.exports= router