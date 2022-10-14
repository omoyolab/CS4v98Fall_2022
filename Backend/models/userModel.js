const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        trim:true
    },
    lastName:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim:true
    },
    password:{
        type:String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        trim:true

    },
    role:{
        type: String,
        required: true,
        trim:true
    },
    userTasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }]

},{
    timestamps: true
});

//Static Signup Method
userSchema.statics.signup = async function(firstName, lastName, email, password, phone, role) {

    //Validation
    if (!email || !password){
        throw Error('All Fields must be Filled')
    }

    if (!validator.isEmail(email)){
        throw Error('Email is not Valid')
    }

    if (!validator.isStrongPassword(password)){
        throw Error('Password not Strong Enough')
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error('Email already Exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, password: hash, firstName, lastName, phone, role})

    return user
}

//Static Login Method
userSchema.statics.login = async function(email, password){

    if (!email || !password){
        throw Error('All Fields must be Filled')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email ')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
}


const User = mongoose.model('User', userSchema);

module.exports = User;

