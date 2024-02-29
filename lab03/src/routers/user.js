const express = require("express");
const UserModel = require("../../models/user");
const {getObjectId} = require("../utils");
const ValidationError = require("mongoose").Error.ValidationError;

const router = new express.Router();

router.get("/users", async (req, res) => {
    try{
        const users = await UserModel.find({});
        res.status(200).send(users);
    }
    catch(err){
        res.sendStatus(500);
    }
});

router.get('/users/:id', async (req, res) => {

    try {

        let _id = getObjectId(req.params.id);

        const user = await UserModel.findOne({_id});

        if (user == null) {
            res.sendStatus(404);
        } else {
            res.status(200).send(user);
        }
    }
    catch(err){
        res.sendStatus(500);
    }
});

router.post("/users", async (req, res) => {
    try {
        const user = new UserModel({
            name: req.body.name,
            age: +(req.body.age),
            email: req.body.email,
            password: req.body.password
        });

        await user.save();
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

router.patch("/users/:id", async (req, res) => {
    try{
        const _id = getObjectId(req.params.id);

        const patchQuery = {$set:req.body};

        await UserModel.updateMany({_id}, patchQuery);

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

router.delete("/users/:id", async (req, res) => {
    try{
        let _id = getObjectId(req.params.id);
        const user = await UserModel.findOne({_id});

        if(user == null){
            res.sendStatus(404);
        }
        else{
            await user.deleteOne();
            res.sendStatus(200);
        }
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

router.delete("/users", async (req, res) => {
    try{
        await UserModel.deleteMany({});

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});


module.exports = router;
