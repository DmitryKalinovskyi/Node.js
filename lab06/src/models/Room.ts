import {ClientModel} from "./ClientModel"


// store data that are required for room, like room messages, clients inside.
export class Room{
    public name: string;
    public messages: Object[];
    // public clients: [ClientModel];
    constructor(name: string){
        this.name = name;
        this.messages = [];
    }

    addMessage(message: any){
        this.messages.push(message);
    }
}