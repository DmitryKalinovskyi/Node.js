export class ClientModel{
    id: string;
    name: string;
    room: string;
    isTyping: boolean;

    constructor(id: string, name: string, room: string) {
        this.id = id;
        this.name = name;
        this.room = room;
        this.isTyping = false;
    }
}

