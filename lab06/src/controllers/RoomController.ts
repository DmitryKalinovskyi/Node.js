import {Request, Response} from 'express'
import {ClientService} from "../services/ClientService";
import {RoomsService} from "../services/RoomsService";

export class RoomController{
    private _clientService: ClientService
    private _roomsService: RoomsService
    public constructor(clientService: ClientService, roomsService: RoomsService) {
        this._roomsService = roomsService;
        this._clientService = clientService;
    }
    public getRoom(request: Request, response: Response): any{
        console.log(request);
    }
}