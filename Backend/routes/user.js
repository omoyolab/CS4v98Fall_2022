const express = require('express')
const{
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    loginUser,

} =  require('../controllers/userController')

const router = express.Router()

// Get All Users
router.get('/', getUsers)

// login User
router.post('/login', loginUser)

// Get a single User
router.get('/:id', getSingleUser)

//Create a New User
router.post('/signup', createUser)


//Delete a User
router.delete('/:id', deleteUser)

//Update a  User
router.patch('/:id', updateUser)



module.exports= router