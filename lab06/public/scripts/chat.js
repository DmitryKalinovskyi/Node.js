import ListItem from "../components/ListItem.js";
import ServerMessage from "../components/ServerMessage.js";
import MyMessage from "../components/MyMessage.js";
import Message from "../components/Message.js";
import {name, room} from "./client.js";


const $list_of_messages = document.querySelector("#list-of-messages");
const $list_of_users = document.querySelector("#list-of-users");
const $infoDiv = document.querySelector("#infoDiv")
// export function addMessage(message){
//     if(message.type === 'server'){
//         $list_of_messages.innerHTML += ServerMessage(message.content);
//     }
//     else if(message.sender === name){
//         $list_of_messages.innerHTML += MyMessage(message.content);
//     }
//     else{
//         $list_of_messages.innerHTML += Message(message.sender, message.content);
//     }
//
//     // scroll to the bottom
//     $list_of_messages.scrollTo(0, $list_of_messages.scrollHeight);
// }

const eventMap = {
    "MessageEvent" : event => onMessageEvent(event),
    "DisconnectEvent" : event => onDisconnectEvent(event),
    "JoinEvent" : event => onJoinEvent(event),
}

function onMessageEvent(event){
    if(event.sender.name === name)
        addMessage(MyMessage(event.message));
    else
        addMessage(Message(event.sender.name, event.message));
}

function onDisconnectEvent(event){
    removeUserFromList(event.client.name);
    addMessage(ServerMessage(`${event.client.name} disconnected from the room.`));
}

function onJoinEvent(event){
    addUserToList(event.client.name)
    addMessage(ServerMessage(`${event.client.name} joined to the room.`));
}

export function addServerEvent(event){
    let eventHandler = eventMap[event.eventType];
    if(eventHandler !== undefined){
        eventHandler(event);
    }
}

export function addMessage(message){
    $list_of_messages.innerHTML += message;
}

export function addUserToList(name) {
    $list_of_users.innerHTML += ListItem(name);
}

export function removeUserFromList(name) {
    $list_of_users.innerHTML = $list_of_users.innerHTML.replace(ListItem(name), "");
}

export function addRoomInfo(info){
    $infoDiv.innerHTML = `
                <div class="text-white">
                    Name: ${info.name}
                </div>
                <div class="text-white">
                    Room: ${info.room}
                </div>`
}
