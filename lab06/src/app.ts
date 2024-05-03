import express, {Request, Response, Express} from 'express'
import dotenv from 'dotenv'
import http from "http"

import {ClientService} from "./services/ClientService";

// @ts-ignore: cannot import module, moduleResolution:nodenext issue 54523
import {Server} from "socket.io";
import * as path from "node:path";
import {SocketService} from "./services/SocketService";
import {ISocketService} from "./services/ISocketService";
import {RoomsService} from "./services/RoomsService";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server);

const port = process.env.Port || 3000;
app.use("/", express.static(path.join(__dirname, 'public')));
app.get('/', (req: Request, res: Response) => {
   res.send("Typescript + node.js + web-sockets (socket.io)");
});

const roomService = new RoomsService();
const clientService = new ClientService();

// hande sockets request
io.on('connection', socket => {
    const socketService: ISocketService = new SocketService(io, socket, clientService, roomService);

    socket.on('join', (name, room) => socketService.join(name, room))

    socket.on('message', (message) => socketService.message(message));

    socket.on('disconnect', () => socketService.disconnect());
})

// Creating
let foo:any = {};
foo.x = 3;
foo.y='123';

let jsonString = JSON.stringify(foo);
console.log(jsonString);


// Reading
interface Bar{
    x:number;
    y?:string;
}

let baz:Bar = JSON.parse(jsonString);
console.log(baz);

server.listen(port, () => {
    console.log("Server started!");
})
