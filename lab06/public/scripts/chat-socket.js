import Message from "../components/Message.js";
import MyMessage from "../components/MyMessage.js";
import ServerMessage from "../components/ServerMessage.js";
import {addUserToList, addMessage, removeUserFromList, addRoomInfo, addServerEvent, getClients} from "./chat.js";
import {name, room} from "./client.js";

const socket = io();
const $form = document.querySelector('form');
const $message_input = document.querySelector("#message-input");
const $someone_typing = document.querySelector("#someone-typing");

function parseMessage(message) {
    // Check if the message matches the pattern
    const regex = /^@(\w+):\s(.*)$/;
    const match = message.match(regex);

    // If there's a match, extract the name and message
    if (match) {
        const name = match[1];
        const messageContent = match[2];
        return { name, message: messageContent };
    } else {
        // Return null or handle invalid messages as needed
        return null;
    }
}

$form.addEventListener('submit', (e) => {
    e.preventDefault();

    let message = $message_input.value;
    message = message.trim();
    if(message === "") return;

    // check if user is trying to send private message.
    if(message[0] === "@"){
        // try to send private message.
        const parsedMessage = parseMessage(message);
        const receiverName = parsedMessage['name'];
        console.log(`Sending private message "${parsedMessage.message}" to ${receiverName}.`)
        // get id by name
        const client = getClients().filter(c => c.name === receiverName)[0];

        if(client !== undefined)
            socket.emit('private-message', parsedMessage.message, client.id);

    }
    else{
        socket.emit("message", message);
    }
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

