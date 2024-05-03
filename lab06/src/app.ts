import express, {Request, Response} from 'express'
import dotenv from 'dotenv'
import http from "http"

import {ClientService} from "./services/ClientService";

// @ts-ignore: cannot import module, moduleResolution:nodenext issue 54523
import {Server} from "socket.io";
import * as path from "node:path";
import {SocketService} from "./services/SocketService";
import {ISocketService} from "./services/ISocketService";
import {RoomsService} from "./services/RoomsService";
import {RoomController} from "./controllers/RoomController";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const port = process.env.Port || 3000;
console.log(__dirname);
app.use("/", express.static(path.join(__dirname + "\\..", 'public')));
app.get('/', (req: Request, res: Response) => {
   res.send("Typescript + node.js + web-sockets (socket.io)");
});

const roomsService = new RoomsService();
const clientService = new ClientService();

const roomController = new RoomController(clientService, roomsService);
app.get('/roomData', (req: Request, res: Response) => roomController.getRoom(req, res));

// hande sockets request
io.on('connection', socket => {
    const socketService: ISocketService = new SocketService(io, socket, clientService, roomsService);

    socket.on('join', (name, room) => socketService.join(name, room))

    socket.on('message', (message) => socketService.message(message));

    socket.on('disconnect', () => socketService.disconnect());
});

server.listen(port, () => {
    console.log("Server started!");
})
