const express = require('express');
const hardwareRouter = express.Router();
const mysql = require('mysql2');


const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'supply_chain',
});

// websocket
// Import the necessary modules
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 4000;

// Create an HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    console.log('Received data:', message);

    // Decode the received Buffer into a string
    const data = message.toString();

    // Try to parse it as JSON if it's structured that way
    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed data:', parsedData);
      // Optionally broadcast the data to all connected clients
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(parsedData));
        }
      });
    } catch (error) {
      console.log('Failed to parse JSON:', data);
    }
  });

  ws.send('Connection established');
});


console.log(`WebSocket server is running on ws://localhost:${port}`);

// Start the server, listening on all interfaces (0.0.0.0)
server.listen(port, '0.0.0.0', () => {
  console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
});


module.exports = hardwareRouter;
