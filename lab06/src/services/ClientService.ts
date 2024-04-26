import {ClientModel} from "../models/ClientModel";

export class ClientService{
    private readonly clients: ClientModel[];

    constructor() {
        this.clients = [];
    }

    registerClient(id: string, clientModel: ClientModel){
        this.clients[id]  = clientModel;
    }

    deleteClient(id: string){
        delete this.clients[id];
    }

    isRegistered(id: string){
        return id in this.clients;
    }

    getClient(id: string){
        return this.clients[id];
    }

    getClientsInTheRoom(room: string): ClientModel[]{
        return Object.values(this.clients).filter(client => client.room === room);
    }
}