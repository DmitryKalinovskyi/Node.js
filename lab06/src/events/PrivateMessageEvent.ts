import {ISocketEvent} from "./ISocketEvent";
import {ClientModel} from "../models/ClientModel";

export class PrivateMessageEvent implements ISocketEvent{
    sender: ClientModel
    receiver: ClientModel
    message: string

    public constructor(sender: ClientModel, receiver: ClientModel, message: string) {
        this.sender = sender;
        this.receiver = receiver;
        this.message =  message;
    }

    eventType: string = "PrivateMessage";
}