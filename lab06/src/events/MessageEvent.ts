import {ISocketEvent} from "./ISocketEvent";

export class MessageEvent implements  ISocketEvent{
    senderId : string
    message: string
}