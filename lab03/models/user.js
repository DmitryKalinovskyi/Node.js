const mongoose = require('mongoose');
const validator = require('validator');
const {hashPassword, comparePasswords} = require('../services/passwordHasher');
const jwt = require('jsonwebtoken');


let userSchema = new mongoose.Schema( {
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
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
    }],
}, {toJSON: {virtuals: true}, toObject: {virtuals: true}});

// Add virtual field to the userModel
userSchema.virtual('tasks', {
    ref: "Task",
    localField: "_id",
    foreignField: 'owner'
})

// Remove access to the private fields
userSchema.methods.toJSON = function (){
    const user = this;


    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    //delete userObject.id;

 //   console.log(userObject);

    return userObject;
}


// Add handler before saving the model
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await hashPassword(user.password);
    }

    next();
});

// Add static method to find by credentials
userSchema.statics.findOneByCredentials = async (email, password) => {
    const user = await User.findOne({email});

    if(!user){
        throw new Error('Incorrect email');
    }

    const isMatch = await comparePasswords(password, user.password);
    if(!isMatch){
        throw new Error('Incorrect password');
    }

    return user;
}

// Add method to generate token and attach it to the user
userSchema.methods.generateAuthToken = async function (){
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_TOKEN);

    user.tokens = user.tokens.concat({token});

    await user.save();

    return token;
}



const User = new mongoose.model('User', userSchema);
module.exports = User