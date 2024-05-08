import Message from "../components/Message.js";
import MyMessage from "../components/MyMessage.js";
import ServerMessage from "../components/ServerMessage.js";
import {addUserToList, addMessage, removeUserFromList, addRoomInfo, addServerEvent} from "./chat.js";
import {name, room} from "./client.js";

const socket = io();
const $form = document.querySelector('form');
const $message_input = document.querySelector("#message-input");
const $someone_typing = document.querySelector("#someone-typing");


$form.addEventListener('submit', (e) => {
    e.preventDefault();

    let message = $message_input.value;
    if(message === "") return;

    socket.emit("message", message);
    $message_input.value = ""
});


$message_input.addEventListener('input', (e) => {
    socket.emit("on-type");
});

// receive arguments that passed in url, and use them in join event


socket.emit("join", name, room)
addRoomInfo({name, room});

socket.on("joined", (roomData) => {
    console.log(roomData);
    for(let event of roomData.room.eventHistory){
        addServerEvent(event);
    }
});

socket.on("server-event", (event) => {
    addServerEvent(event);
})

socket.on("server-message", (message) => {
    addMessage(ServerMessage(message));
})

socket.on("message-received", (message) => {
    // addMessage(message);
})

socket.on("server-test-message", (message) => {
    console.log(message);
})


let timeoutId = null;
socket.on("on-type", (client) => {
    $someone_typing.innerHTML = `${client.name} is typing..`;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => $someone_typing.innerHTML = "", 2000);
})

