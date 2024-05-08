import {ClientService} from "./ClientService";
import {RoomsService} from "./RoomsService";
import {ClientModel} from "../models/ClientModel";
import {Socket} from "socket.io";
import {ISocketService} from "./ISocketService";
import {JoinEvent} from "../events/JoinEvent";
import {DisconnectEvent} from "../events/DisconnectEvent";
import {MessageEvent} from "../events/MessageEvent";
import {PrivateMessageEvent} from "../events/PrivateMessageEvent";
import {ISocketEvent} from "../events/ISocketEvent";

export class SocketService implements ISocketService{
    private _clientService: ClientService;
    private _roomsService: RoomsService;
    private socket: any;
    private io: any;
    constructor(io: any, socket: any, clientService:ClientService, roomsService: RoomsService) {
        this._clientService = clientService;
        this._roomsService = roomsService;

        this.io = io;
        this.socket = socket;
    }

    private emitToRoom(room: string, eventName: string, event: ISocketEvent, filter){
        if(filter == undefined)
            this.io.to(room).emit(eventName, event);
        else{
            for(let client in this._clientService.getClientsInTheRoom(room)){
                if(filter(client)){
                    this.io.to()
                }
            }
        }
    }

    onType(){
        if(this._clientService.isRegistered(this.socket.id) === false) {
            this.socket.emit("server-message", "you are not joined.");
            return;
        }

        const client = this._clientService.getClient(this.socket.id);

        this.socket.broadcast.to(client.room).emit("on-type", client);
    }

    privateMessage(message: string, receiverId: string): void {
        if(this._clientService.isRegistered(this.socket.id) === false){
            this.socket.emit("server-message", "you are not joined.");
            return;
        }

        if(this._clientService.isRegistered(receiverId) === false){
            this.socket.emit("server-message", "receiver are not joined.");
            return;
        }

        if(receiverId === this.socket.id){
            this.socket.emit("server-message", "you can't send to yourself.");
            return;
        }

        const client = this._clientService.getClient(this.socket.id);
        const receiver = this._clientService.getClient(receiverId);

        const room = this._roomsService.getRoom(client.room);

        const event = new PrivateMessageEvent(client, receiver, message);

        this.socket.emit("message-received");
        room.addEvent(event);

        // this.emitToRoom(room.name, 'server-event', event, (c) => c.id == client.id || c.id == receiver.id);
        this.io.to(client.room).emit('server-event', event);
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
        this.socket.emit("joined", {room, clients: this._clientService.getClientsInTheRoom(roomName)});
        const event = new JoinEvent(client);
        room.addEvent(event);

        // emit all users in the room
        this.io.to(roomName).emit("server-event", event);
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
        room.addEvent(event);
        this.io.to(client.room).emit('server-event', event);
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