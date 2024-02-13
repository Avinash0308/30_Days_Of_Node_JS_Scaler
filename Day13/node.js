const output = document.getElementById("output");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

const ws = new WebSocket(`ws://${window.location.host}/websocket`);

ws.addEventListener("open", () => {
  output.innerHTML += "<p>WebSocket connection established.</p>";
});

ws.addEventListener("message", (event) => {
  output.innerHTML += `<p>Server says: ${event.data}</p>`;
});

ws.addEventListener("error", (error) => {
  output.innerHTML += `<p>Error: ${error.message}</p>`;
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (message) {
    ws.send(message);
    output.innerHTML += `<p>You: ${message}</p>`;
    messageInput.value = "";
  }
});
