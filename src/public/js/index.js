const socket = io();

let username;

Swal.fire({
    title: "Identifícate",
    input: "text",
    text: "Ingresa tu nombre de usuario.",
    inputValidator: (value) => {
        return !value && "Es obligatorio un nombre de usuario.";
    },
    allowOutsideClick: false,
}).then((result) => {
    username = result.value;
    socket.emit("new-user", username);
    console.log(username);
})

const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
    sendMessage();
});

chatInput.addEventListener("keyup", (ev) => {
    if (ev.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const inputMessage = chatInput.value;
    if (inputMessage.trim().length > 0) {
        socket.emit("chat-message", { username, message: inputMessage });
        chatInput.value = "";
    }
}

const messagesPanel = document.getElementById("messages-panel");

socket.on("messages", (data) => {
    let messages = "";

    data.forEach((m) => {
        messages += `<div class="mb-3"><b>${m.username}:</b> ${m.message}</div>`;
    });
    messagesPanel.innerHTML = messages;
});

socket.on("new-user", (username) => {
    Swal.fire({
        title: `${username} se ha unido al chat`,
        toast: true,
        position: "top-end"
    })
});

socket.on("userNoAutorizado", (username) => {
    Swal.fire({
        title: `${username}: Su rol no está definido o no está autorizado para chatear. Debe loguearse y no ser Admin.`,
        toast: true,
        position: "top-end"
    })
});
