import {ClientModel} from "../models/ClientModel";
import {ISocketEvent} from "./ISocketEvent";

export class JoinEvent implements ISocketEvent{
     client: ClientModel
}