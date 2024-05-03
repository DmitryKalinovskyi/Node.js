import {ClientModel} from "./ClientModel"
import {ISocketEvent} from "../events/ISocketEvent";


// store data that are required for room, like room messages, clients inside.
export class Room{
    public name: string;
    public eventHistory: ISocketEvent[];
    // public clients: [ClientModel];
    constructor(name: string){
        this.name = name;
        this.eventHistory = [];
    }

    addEvent(event: ISocketEvent){
        this.eventHistory.push(event);
    }
}