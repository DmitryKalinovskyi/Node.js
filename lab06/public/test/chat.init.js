import Message from "../components/Message.js";
import MyMessage from "../components/MyMessage.js";
import ServerMessage from "../components/ServerMessage.js";

addMessage(Message("Dmytro", "Hello!"));
addMessage(ServerMessage("Dmytro2 joined the server"));
addMessage(MyMessage("Hello Dmytro!"));
addMessage(MyMessage("Hello Dmytro!"));