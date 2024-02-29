const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    name: {type: String},
    age: {
        type: Number,
        required: true,
        trim: true,
        default: 0,
        validate(value) {
            if(value < 0)
                throw new Error("Age can't be negative.");
        }
    },
    email:{
        type: String,
        lowercase: true,
        validate: validator.isEmail,
        unique: true
    },
    password:{
        type: String,
        trim: true,
        required: true,
        validate(pass) {
            if(pass.length < 7)
                throw Error("Password is too short, it should be at least 7 characters.")

            if(pass.includes('password'))
                throw Error("Password can't contain word \"password\".")
        }
    }
});

module.exports = User