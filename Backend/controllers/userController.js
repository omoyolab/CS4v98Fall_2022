let User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')



const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})

}

// login
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login( email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email ,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }  
}


// Get All User
const getUsers = async ( req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    .populate('userTasks')

    res.status(200).json(users)
}

// Get a single User
const getSingleUser= async( req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User Does not Exist'})
    }
    const user = await User.findById(id)
    .populate('userTasks')

    if(!user){
        return res.status(404).json({error: 'User Does not Exist'})
    }

    res.status(200).json(user)
}


//Sign Up User
const createUser = async (req, res) => {
    const {firstName, lastName, email, password, phone, role} = req.body

    try {
        const user = await User.signup(firstName, lastName, email, password, phone, role)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }   
}


//Delete a User
const deleteUser = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User Does not Exist'})
    }

    const user = await User.findByIdAndDelete({_id: id})

    if(!user){
        return res.status(404).json({error: 'User Does not Exist'})
    }

    return res.status(200).json({message: 'User Successfully Deleted'})
}

//Update a User
const updateUser = async (req, res) => {
    const{ id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'User Does not Exist'})
    }

    const user = await User.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
        return res.status(404).json({error: 'User Does not Exist'})
    }

    return res.status(200).json({error: 'User Successfully Updated'})
}















module.exports = {
    createUser,
    getUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    loginUser
}