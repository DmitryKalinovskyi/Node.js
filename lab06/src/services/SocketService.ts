import {ClientService} from "./ClientService";
import {RoomsService} from "./RoomsService";
import {ClientModel} from "../models/ClientModel";
import {Socket} from "socket.io";
import {ISocketService} from "./ISocketService";
import {JoinEvent} from "../events/JoinEvent";
import {DisconnectEvent} from "../events/DisconnectEvent";
import {MessageEvent} from "../events/MessageEvent";

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

        if(this._clientService.isRegistered(id))
            return;

        let client =  new ClientModel(id, name, roomName);
        this._clientService.registerClient(id, client)

        // after user is registered, we need to add to the room
        this.socket.join(roomName);

        const room = this._roomsService.getRoom(roomName);

        // emit user
        this.socket.emit("joined");
        const event = new JoinEvent(client);
        room.addEvent(event);

        // emit all users in the room
        this.socket.to(roomName).emit("server-event", event);
    }

    message(messageContent: string) {
        if(this._clientService.isRegistered(this.socket.id) === false){
            this.socket.emit("server-message", "you are not joined.");
            return;
        }

        const client = this._clientService.getClient(this.socket.id);

        const room = this._roomsService.getRoom(client.room);

        const event = new MessageEvent(client, messageContent);

        this.socket.emit("message-received");

        room.addEvent(MessageEvent);
        this.socket.broadcast.to(client.room).emit('message', event);
    }

    disconnect(){
        if(this._clientService.isRegistered(this.socket.id) === false){
            this.socket.emit("server-message", "bye.");
            return;
        }

        const client = this._clientService.getClient(this.socket.id);
        this._clientService.deleteClient(this.socket.id);

        const room = this._roomsService.getRoom(client.room);

        const event = new DisconnectEvent(client);
        room.addEvent(event)
        this.socket.to(client.room).emit("server-event", event);
    }
}