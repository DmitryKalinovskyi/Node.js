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
    }
});

module.exports = Task;
