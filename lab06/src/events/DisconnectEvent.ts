import {ISocketEvent} from "./ISocketEvent";
import {ClientModel} from "../models/ClientModel";

// export class DisconnectEvent implements ISocketEvent{
//     clientId: number
//
// }

export class DisconnectEvent implements ISocketEvent{
    client: ClientModel

    public constructor(client:ClientModel) {
        this.client = client;
    }

    eventType: string = "DisconnectEvent";
}