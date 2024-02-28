const express = require('express');
const http = require('http');
const setupWebSocketServer = require('./setupWebSocketServer'); 

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('WebSocket Server is Running!!');
});

// Set up WebSocket server
setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
