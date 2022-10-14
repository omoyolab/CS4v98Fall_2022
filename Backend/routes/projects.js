const express = require('express')
const{
    createProject,
    getProjects,
    getSingleProject,
    updateProject,
    deleteProject

} =  require('../controllers/projectController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)


// Get All Projects
router.get('/', getProjects)

// Get a single Projects
router.get('/:id', getSingleProject)

//Create a New Project
router.post('/', createProject)


//Delete a Project
router.delete('/:id', deleteProject)

//Update a  Project
router.patch('/:id', updateProject)



module.exports= router