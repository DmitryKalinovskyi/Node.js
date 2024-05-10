const chai = require('chai');
const chaiHttp = require("chai-http");
const User = require("../models/user");
const Task = require('../models/task')
const mongoose = require("mongoose");
const app = require("../src/app");
const assert = require('assert')
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("Test-Scenario", async () => {
    before(async () => {
        // clean db.
        await Task.deleteMany({});
        await User.deleteMany({});
    });

    const app = require("../src/app.js")

    it("Add user 1 with validation error", async () => {

        let user1 = {
            name: "User1",
            age: 18,
            email: "user1@gmail.com",
            password: "password"
        }

        const result = await chai.request(app)
            .post("/users")
            .send(user1);

        console.log(result.body);
        result.should.have.status(401);
    })

    it("Add user 1 without validation error", async () => {

        let user1 = {
            name: "User1",
            age: 18,
            email: "user1@gmail.com",
            password: "1234567"
        }

        const res = await chai.request(app)
            .post("/users")
            .send(user1);

        res.should.have.status(200);
        console.log(res.body)
    })

    it("Add user 2", async () => {

        let user1 = {
            name: "User2",
            age: 18,
            email: "user2@gmail.com",
            password: "1234567"
        }

        const res = await chai.request(app)
            .post("/users")
            .send(user1);

        res.should.have.status(200);
        console.log(res.body)
    })

    let token;
    it("Login by user1",  async()=> {
        const credentials = {
            email: "user1@gmail.com",
            password: "1234567"
        }

        const res = await chai.request(app)
            .post("/users/login")
            .send(credentials);


        res.should.have.status(200);
        token = res.body.token;
        console.log(res.body)
    });


    let task1;
    it("Adding Task 1",  async()=> {
        const task1_post = {
            title: "Task 1",
            description: "Do some work 1",
            completed: false,
        }

        const res = await chai.request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(task1_post);

        res.should.have.status(200);
        task1 = res.body;
        console.log(res.body);
    });

    it("Adding Task 2",  async()=> {
        const task2 = {
            title: "Task 2",
            description: "Do some work 2",
            completed: false,
        }

        const res = await chai.request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(task2);

        res.should.have.status(200);
        console.log(res.body);
    });

    it("Get user tasks", async() => {
       const res = await chai.request(app)
           .get("/tasks")
           .set("Authorization", `Bearer ${token}`);

       let tasks = res.body;
       res.should.have.status(200);
       assert(tasks.length, 2);
    });

    it("Get user task by id", async() => {
        const res = await chai.request(app)
            .get(`/tasks/${task1._id}`)
            .set("Authorization", `Bearer ${token}`);

        res.should.have.status(200);
        let task = res.body;
        task.should.have.property("title");
        task.should.have.property("completed");
    });

    it("Logout from user1",  async()=> {
        const res = await chai.request(app)
            .post("/users/logout")
            .set("Authorization", `Bearer ${token}`);

        res.should.have.status(200);
        console.log(res.body);
    });

    it("Login by user2",  async()=> {
        const credentials = {
            email: "user2@gmail.com",
            password: "1234567"
        }

        const res = await chai.request(app)
            .post("/users/login")
            .send(credentials);


        res.should.have.status(200);
        token = res.body.token;
    });

    it("Adding Task 3",  async()=> {
        const task3 = {
            title: "Task 3",
            description: "Do some work 3",
            completed: false,
        }

        const res = await chai.request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send(task3);

        res.should.have.status(200);
        console.log(res.body);
    });

    it("Get user tasks", async() => {
        const res = await chai.request(app)
            .get("/tasks")
            .set("Authorization", `Bearer ${token}`);

        let tasks = res.body;
        res.should.have.status(200);
        assert(tasks.length, 1);
    });

    it("Get task1 by id", async() => {
        const res = await chai.request(app)
            .get(`/tasks/${task1._id}`)
            .set("Authorization", `Bearer ${token}`);

        res.should.have.status(404);
    });

    it("Logout from user2",  async()=> {
        const res = await chai.request(app)
            .post("/users/logout")
            .set("Authorization", `Bearer ${token}`);


        res.should.have.status(200);
    });

    it("Get task1 by id", async() => {
        const res = await chai.request(app)
            .get(`/tasks/${task1._id}`)

        res.should.have.status(403);
        res.body.should.have.property("message", "Forbidden Access");
    });

});