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
    // Process the received data (e.g., parse and display it)
    // Decode the received Buffer into a string
    const data = message.toString();  // **Changed**

    // Try to parse it as JSON if it's structured that way
    try {
      const parsedData = JSON.parse(data);  // **Changed**
      console.log('Received data:', parsedData);  // **Changed**
      // Now you can process the data (temperature and humidity)
    } catch (error) {
      console.log('Received non-JSON data:', data);  // **Changed**
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
