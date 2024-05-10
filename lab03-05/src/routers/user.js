const express = require("express");
const UserModel = require("../../models/user");
const {getObjectId} = require("../utils");
const ValidationError = require("mongoose").Error.ValidationError;
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");

const router = new express.Router();

router.get("/users", auth, async (req, res) => {
    try{
        const users = await UserModel.find({});
        res.status(200).send(users);
    }
    catch(err){
        res.sendStatus(500);
    }
});

router.get("/users/me", auth, async (req, res) => {
    await req.user.populate('tasks');


    res.status(200).send(req.user);
})

router.post("/users/logout", auth,async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();
        res.sendStatus(200);
    }catch(e){
        res.sendStatus(500);
    }
});

router.post("/users/logoutAll", auth,async (req, res) => {
    try{
        req.user.tokens = [];

        await req.user.save();
        res.sendStatus(200);
    }
    catch(e){
        res.sendStatus(500);
    }
});

router.get('/users/:id', auth, async (req, res) => {

    try {

        let _id = getObjectId(req.params.id);

        const user = await UserModel.findOne({_id});

        await user.populate('tasks');

        if(!user){
            res.sendStatus(404);
            return;
        }

        res.status(200).send(user);
    }
    catch(err){
        res.sendStatus(500);
    }
});

// router.get('/users/email/:email', auth,async (req, res) => {
//
//     try {
//         const email = req.params.email;
//         const user = await UserModel.findOne({email});
//
//         if (user == null) {
//             res.sendStatus(404);
//         } else {
//             res.status(200).send(user);
//         }
//     }
//     catch(err){
//         res.sendStatus(500);
//     }
// });

// router.get('/users/emailstart/:email', async (req, res) => {
//
//     try {
//         let email = req.params.email;
//         if(email[0] === ':')
//             email = "";
//
//         const escapedEmail = email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
//
//         const regex = new RegExp(`^${escapedEmail}`, 'i');
//
//         const users = await UserModel.find({email: regex }).limit(10);
//
//         res.status(200).send(users);
//     }
//     catch(err){
//         res.sendStatus(500);
//     }
// });

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
            res.status(401).send(err.message);
        }
        else{
            console.log(err);
            res.sendStatus(500);
        }
    }
});

router.patch("/users/:id", auth, async (req, res) => {
    try{
        const _id = getObjectId(req.params.id);

        // TODO: check if id's matches, then perform patch

        // const patchQuery = {$set:req.body};

        // await UserModel.updateOne({_id}, patchQuery);

        const user = await UserModel.findOne({_id});

        // perform saving by hand
        const fields = ['name', 'age', 'email', 'password']

        for(let field of fields){
            if(req.body[field])
            user[field] = req.body[field];
        }

        await user.save();

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

router.delete("/users/:id", auth, async (req, res) => {
    try{
        let _id = getObjectId(req.params.id);

        // TODO: compare id's, if they matches perform deletion

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

router.delete("/users", auth, hasRole("admin"), async (req, res) => {
    try{
        await UserModel.deleteMany({});

        res.sendStatus(200);
    }
    catch(err){
        console.log(err.message);

        res.sendStatus(500);
    }
});

router.post("/users/login", async (req, res) => {
    try{
        const user = await UserModel.findOneByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({user, token});
    }
    catch(e){
        console.log(e.message);
        res.sendStatus(400);
    }
});

// router.get("/users/me", async (req, res) => {
//    res.sendStatus(200);
//
//
//    // res.send(req.user);
// });





module.exports = router;
