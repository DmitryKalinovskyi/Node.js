export interface ISocketService{
    join(name: string, room: string): void;
    message(message: string): void;
    disconnect(): void;
}