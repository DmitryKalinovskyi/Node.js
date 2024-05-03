import {ISocketEvent} from "./ISocketEvent";
import {ClientModel} from "../models/ClientModel";

// export class JoinEvent implements ISocketEvent{
//      clientId: number
//
//      public constructor(clientId: number) {
//           this.clientId = clientId;
//      }
// }

export class JoinEvent implements ISocketEvent{
     client: ClientModel

     public constructor(client: ClientModel) {
          this.client = client;
     }
}