import {Room} from "../models/Room";
import {Server} from "socket.io";

// manages all rooms in application
export class RoomsService{
    private readonly rooms: Object;

    constructor() {
        this.rooms = {};
    }

    getRoom(name: string): Room{
        if(name in this.rooms){
            return this.rooms[name];
        }
        console.log(`Created new room: ${name}.`)

        this.rooms[name] = new Room(name);
        return this.rooms[name];
    }
}

