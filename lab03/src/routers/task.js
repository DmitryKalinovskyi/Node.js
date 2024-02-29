const express = require("express");
const TaskModel = require("../../models/task");
const {getObjectId} = require("../utils");
const ValidationError = require("mongoose").Error.ValidationError;

const router = new express.Router();

router.get("/tasks", async (req, res) => {
    try{
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    }
    catch(err){
        res.sendStatus(500);
    }
});

router.get('/tasks/:id', async (req, res) => {

    try {

        let _id = getObjectId(req.params.id);

        const task = await TaskModel.findOne({_id});

        if (task == null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(task);
        }
    }
    catch(err){
        res.sendStatus(500);
    }
});

router.post("/tasks", async (req, res) => {
    try {
        const task = new TaskModel({
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        });

        await task.save();
        res.sendStatus(200);

    }
    catch(err){
        if(err instanceof ValidationError)
        {
            res.status(500).send(err.message);
        }
        else{
            console.log(err);
            res.sendStatus(500);
        }
    }
});

router.patch("/tasks/:id", async (req, res) => {
    try{
        const _id = getObjectId(req.params.id);

        const patchQuery = {$set:req.body};

        await TaskModel.updateMany({_id}, patchQuery);

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

router.delete("/tasks/:id", async (req, res) => {
    try{
        let _id = getObjectId(req.params.id);
        const task = await TaskModel.findOne({_id});

        if(task == null){
            res.sendStatus(404);
        }
        else{
            await task.deleteOne();
            res.sendStatus(200);
        }
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

router.delete("/tasks", async (req, res) => {
    try{
        await TaskModel.deleteMany({});

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

module.exports = router;
