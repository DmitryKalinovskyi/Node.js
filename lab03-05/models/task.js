const mongoose = require('mongoose');

const Task = mongoose.model("Task", {
    title:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        optional: true,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = Task;
