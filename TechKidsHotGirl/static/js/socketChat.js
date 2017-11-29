const usernameElement = $("#username");
const messageElement = $("#message");
const joinServerButton = $("#joinServer");
const chatForm = $("#chatForm");
const recipientInput = $("#recipientInput");
const chatMessageElement = $("#chatMessages");

const socket = io();

socket.on("userConnect", data => {
    console.log(data)
});

socket.on("welcomeMessage", data => {
    console.log(data)
});

chatForm.on("submit", event => {
    event.preventDefault();
    let username = usernameElement.val();
    let message = messageElement.val();
    let recipient = recipientInput.val();

    if (!(username && message && recipient)) return;

    messageElement.val("");

    const messageObject = {
        username,
        message,
        recipient
    };
    socket.emit("userSendMessage", messageObject)
});

joinServerButton.on("click", event => {
    let username = usernameElement.val();
    if (!username) {
        return
    }
    socket.emit("userJoin", {username})
});

socket.on("newMessage", data => {
    chatMessageElement.append(`${data.message}<br/>`);
    console.log(data);
});