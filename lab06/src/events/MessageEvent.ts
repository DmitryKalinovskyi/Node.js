import {ISocketEvent} from "./ISocketEvent";
import {ClientModel} from "../models/ClientModel";

export class MessageEvent implements  ISocketEvent{
    sender: ClientModel
    message: string

    public constructor(sender: ClientModel, message: string) {
        this.sender = sender;
        this.message = message;
    }

    eventType: string = "MessageEvent";
}