const express = require('express')
const{
    createArchive,
    getArchives,
    getSingleArchive,
    updateArchive,
    deleteArchive

} =  require('../controllers/archiveController')

const router = express.Router()

// Get All Archives
router.get('/', getArchives)

// Get a single Archives
router.get('/:id', getSingleArchive)

//Create a New Archive
router.post('/', createArchive)


//Delete a Archive
router.delete('/:id', deleteArchive)

//Update an Archive
router.patch('/:id', updateArchive)


module.exports= router