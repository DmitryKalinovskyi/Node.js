import express, {Request, Response, Express} from 'express'
import dotenv from 'dotenv'
import http from "http"
// const Server = require("socket.io").Server;

// @ts-ignore: cannot import module, moduleResolution:nodenext issue 54523
import {Server} from "socket.io";
import * as path from "node:path";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const port = process.env.Port || 3000;
app.use("/", express.static(path.join(__dirname, 'public')));
app.get('/', (req: Request, res: Response) => {
   res.send("Typescript + node.js + web-sockets (socket.io)");
});

const clients = {};

// io.use((socket, next) => {
//     const id = socket.id;
//     if(id in clients)
//         socket.data.client = clients[id];
//
//     next();
// })

// hande sockets request
io.on('connection', socket => {

    socket.on('join', (name, room) => {

        // we will use id to add cache for the user
        const id = socket.id;
        clients[id] = {name, room};

        console.log(`User ${name} joined to the room ${room}`);
        socket.join(room);
        io.to(room).emit("server-message", `${name} joined to the server`)
    })

    socket.on('message', message => {
        if(!(socket.id in clients)){
            socket.emit("server-message", "you are not joined.");
            return;
        }

        const client = clients[ socket.id];

        // console.log(`${client.name} send message: ${message}`);
        // socket.broadcast.to(userRoom).emit("message", `User send message: ${message}!`);
        socket.emit("message-received", message);

        socket.broadcast.to(client.room).emit('message', client.name, message);
    });

    socket.on('disconnect', () => {
        if(!(socket.id in clients)){
            socket.emit("server-message", "bye.");
            return;
        }

        const client = clients[ socket.id];
        delete clients[socket.id];
console.log(client)
        socket.broadcast.to(client.room).emit("server-message", `${client.name} disconnected.`);
        console.log(`${client.name} disconnected.`)
    })

    socket.on('get-room-data', () => {

    })
})

server.listen(port, () => {
    console.log("Server started!");
})