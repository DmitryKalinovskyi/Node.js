import {ISocketEvent} from "./ISocketEvent";
import {ClientModel} from "../models/ClientModel";

export class DisconnectEvent implements ISocketEvent{
    client: ClientModel
}