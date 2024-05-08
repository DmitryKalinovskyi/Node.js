export interface ISocketService{
    join(name: string, room: string): void;
    message(message: string): void;
    privateMessage(message: string, receiverId: string): void;
    disconnect(): void;

    onType(): void;
}