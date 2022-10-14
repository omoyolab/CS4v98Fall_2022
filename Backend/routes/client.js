const express = require('express')
const{
    createClient,
    getClients,
    getSingleClient,
    updateClient,
    deleteClient

} =  require('../controllers/clientController')
const router = express.Router()


// Get All Clients
router.get('/', getClients)

// Get a single Client
router.get('/:id', getSingleClient)

//Create a New Client
router.post('/', createClient)


//Delete a Client
router.delete('/:id', deleteClient)

//Update a Client
router.patch('/:id', updateClient)




module.exports = router