import {ClientService} from "./ClientService";
import {RoomsService} from "./RoomsService";
import {ClientModel} from "../models/ClientModel";
import {Socket} from "socket.io";
import {ISocketService} from "./ISocketService";

export class SocketService implements ISocketService{
    private _clientService: ClientService;
    private _roomsService: RoomsService;
    private socket: any;
    private io: any;
    constructor(io, socket: any, clientService:ClientService, roomsService: RoomsService) {
        this._clientService = clientService;
        this._roomsService = roomsService;

        this.io = io;
        this.socket = socket;

        this.initialize();
    }

    private initialize(){

    }

    join(name: string, roomName: string){
        const id = this.socket.id;
        this._clientService.registerClient(id, new ClientModel(id, name, roomName))

        // after user is registered, we need to add to the room
        this.socket.join(roomName);

        const clients = this._clientService.getClientsInTheRoom(roomName);
        const room = this._roomsService.getRoomData(roomName);
        // emit user
        this.socket.emit("joined", {clients, room});

        const message = {content: `${name} joined to the server`, type:'server'};
        room.addMessage(message);

        // emit all users in the room
        this.socket.to(roomName).emit("user-joined", name);
    }

    message(messageContent: string) {
        if(this._clientService.isRegistered(this.socket.id) === false){
            this.socket.emit("server-message", "you are not joined.");
            return;
        }

        const client = this._clientService.getClient(this.socket.id);

        // console.log(`${client.name} send message: ${message}`);
        // socket.broadcast.to(userRoom).emit("message", `User send message: ${message}!`);
        const room = this._roomsService.getRoomData(client.room);
        const message = {sender: client.name, content: messageContent, type: 'client'}
        this.socket.emit("message-received", message);
        room.addMessage(message);
        this.socket.broadcast.to(client.room).emit('message', message);
    }

    disconnect(){
        if(this._clientService.isRegistered(this.socket.id) === false){
            this.socket.emit("server-message", "bye.");
            return;
        }

        const client = this._clientService.getClient(this.socket.id);
        this._clientService.deleteClient(this.socket.id);

        const room = this._roomsService.getRoomData(client.room);
        const message = {content: `${client.name} disconnected.`, type: 'server'};
        room.addMessage(message);
        this.socket.to(client.room).emit("user-disconnected", message);
    }
}