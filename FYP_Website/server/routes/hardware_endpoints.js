// CODE 2: CONSTANT QUERY

// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // WebSocket
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const port = 4000;

// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         // Convert Buffer to string to properly parse the data
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to a UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON
//             console.log('Parsed data:', parsedData);

//             // Fetch the three rows from the database
//             db.query(
//                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                 (err, result) => {
//                     if (err) {
//                         console.error('Failed to fetch from database:', err);
//                         return;
//                     }

//                     // Add the byproduct IDs to the data before sending it to the client
//                     const updatedData = {
//                         ...parsedData,
//                         byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                     };

//                     // Send the updated data to all clients
//                     wss.clients.forEach(client => {
//                         if (client.readyState === WebSocket.OPEN) {
//                             client.send(JSON.stringify(updatedData));
//                         }
//                     });
//                 }
//             );
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// module.exports = hardwareRouter;







// COMPUTER VISION (Processing the result of computer vision) (????)
// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');
// const { spawn } = require('child_process'); // Import the spawn function from child_process module

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // WebSocket
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const port = 4000;

// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         // Convert Buffer to string to properly parse the data
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to a UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON
//             // console.log('Parsed data:', parsedData);

//             // Check if any rfid_process has reached the value of 3
//             if (
//                 parsedData.rfid_process_1 === 3 ||
//                 parsedData.rfid_process_2 === 3 ||
//                 parsedData.rfid_process_3 === 3
//             ) {
//                 console.log('Triggering Python script as one of the processes reached 3');

//                 // Run the Python script
//                 const pythonProcess = spawn('python', ['D:/FYP_Web/FYP_Website/server/routes/defect_detection.py']); // Replace with your actual Python script path

//                 let pythonOutput = '';
//                 let pythonError = '';

//                 // Handle data from the Python script
//                 pythonProcess.stdout.on('data', (data) => {
//                     pythonOutput += data.toString(); // Accumulate output from the script
//                 });

//                 pythonProcess.stderr.on('data', (data) => {
//                     pythonError += data.toString(); // Accumulate errors from the script
//                 });

//                 pythonProcess.on('close', (code) => {
//                     console.log(`Python script exited with code ${code}`);
                    
//                     // Log the raw output for debugging
//                     console.log(`Raw Python output: '${pythonOutput}'`); 

//                     if (code === 0) {
//                         try {
//                             const defectStatus = parseInt(pythonOutput.trim()); // Assuming the output is '0' or '1'
//                             console.log(`Defect Status: ${defectStatus}`);

//                             // Check if defectStatus is a valid number
//                             if (isNaN(defectStatus)) {
//                                 console.error('Defect Status is NaN');
//                             }

//                             // Fetch the three rows from the database
//                             db.query(
//                                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                                 (err, result) => {
//                                     if (err) {
//                                         console.error('Failed to fetch from database:', err);
//                                         return;
//                                     }

//                                     // Add the byproduct IDs and defect status to the data before sending it to the client
//                                     const updatedData = {
//                                         ...parsedData,
//                                         byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                                         defect_status: defectStatus, // Include the defect status
//                                     };

//                                     // Send the updated data to all clients
//                                     wss.clients.forEach(client => {
//                                         if (client.readyState === WebSocket.OPEN) {
//                                             client.send(JSON.stringify(updatedData));
//                                         }
//                                     });
//                                 }
//                             );
//                         } catch (error) {
//                             console.error('Failed to parse Python output:', error);
//                         }
//                     } else {
//                         console.error(`Python script error: ${pythonError}`);
//                     }
//                 });
//             } else {
//                 // If no condition is met, just fetch from the database
//                 db.query(
//                     `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                     (err, result) => {
//                         if (err) {
//                             console.error('Failed to fetch from database:', err);
//                             return;
//                         }

//                         // Add the byproduct IDs to the data before sending it to the client
//                         const updatedData = {
//                             ...parsedData,
//                             byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                             defect_status: null, // No defect status if script is not run
//                         };

//                         // Send the updated data to all clients
//                         wss.clients.forEach(client => {
//                             if (client.readyState === WebSocket.OPEN) {
//                                 client.send(JSON.stringify(updatedData));
//                             }
//                         });
//                     }
//                 );
//             }
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// module.exports = hardwareRouter;





//CSV automatic
// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');
// const { spawn } = require('child_process'); // Import the spawn function from child_process module
// const path = require('path'); // Import path module for handling file paths
// const http = require('http');
// const WebSocket = require('ws');
// //
// const fs = require('fs');
// const csv = require('csv-parser');
// //

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // Create an Express app
// const app = express();
// const port = 4000;

// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON

//             // Check if any rfid_process has reached the value of 3
//             if (
//                 parsedData.rfid_process_1 === 3 ||
//                 parsedData.rfid_process_2 === 3 ||
//                 parsedData.rfid_process_3 === 3
//             ) {
//                 console.log('Triggering Python script as one of the processes reached 3');

//                 // Run the Python script
//                 const pythonProcess = spawn('python', ['D:/FYP_Web/FYP_Website/server/routes/defect_detection.py']); // Replace with your actual Python script path

//                 let pythonOutput = '';
//                 let pythonError = '';

//                 // Handle data from the Python script
//                 pythonProcess.stdout.on('data', (data) => {
//                     pythonOutput += data.toString(); // Accumulate output from the script
//                 });

//                 pythonProcess.stderr.on('data', (data) => {
//                     pythonError += data.toString(); // Accumulate errors from the script
//                 });

//                 pythonProcess.on('close', (code) => {
//                     console.log(`Python script exited with code ${code}`);
                    
//                     console.log(`Raw Python output: '${pythonOutput}'`); 

//                     if (code === 0) {
//                         try {
//                             const defectStatus = parseInt(pythonOutput.trim()); // Assuming the output is '0' or '1'
//                             console.log(`Defect Status: ${defectStatus}`);

//                             // Check if defectStatus is a valid number
//                             if (isNaN(defectStatus)) {
//                                 console.error('Defect Status is NaN');
//                             }

//                             // Fetch the three rows from the database
//                             db.query(
//                                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                                 (err, result) => {
//                                     if (err) {
//                                         console.error('Failed to fetch from database:', err);
//                                         return;
//                                     }

//                                     // Add the byproduct IDs and defect status to the data before sending it to the client
//                                     const updatedData = {
//                                         ...parsedData,
//                                         byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                                         defect_status: defectStatus, // Include the defect status
//                                     };

//                                     // Send the updated data to all clients
//                                     wss.clients.forEach(client => {
//                                         if (client.readyState === WebSocket.OPEN) {
//                                             client.send(JSON.stringify(updatedData));
//                                         }
//                                     });
//                                 }
//                             );
//                         } catch (error) {
//                             console.error('Failed to parse Python output:', error);
//                         }
//                     } else {
//                         console.error(`Python script error: ${pythonError}`);
//                     }
//                 });
//             } else {
//                 // If no condition is met, just fetch from the database
//                 db.query(
//                     `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                     (err, result) => {
//                         if (err) {
//                             console.error('Failed to fetch from database:', err);
//                             return;
//                         }

//                         // Add the byproduct IDs to the data before sending it to the client
//                         const updatedData = {
//                             ...parsedData,
//                             byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                             defect_status: null, // No defect status if script is not run
//                         };

//                         // Send the updated data to all clients
//                         wss.clients.forEach(client => {
//                             if (client.readyState === WebSocket.OPEN) {
//                                 client.send(JSON.stringify(updatedData));
//                             }
//                         });
//                     }
//                 );
//             }
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// // Serve the CSV file from the specified path


// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// app.get('/csv', (req, res) => {
//     console.log('Received request for /csv'); // Log to confirm the route is being accessed
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');
//     const results = [];

//     fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//             console.log('Data being sent:', results); // Log the data to confirm it
//             res.json(results); // Send the parsed data as JSON
//         })
//         .on('error', (err) => {
//             console.error('Error reading the CSV file:', err);
//             res.status(500).send('Error reading the CSV file');
//         });
// });

// module.exports = hardwareRouter;



// CSV HANDLING MISSING CSV FILE
// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');
// const { spawn } = require('child_process'); // Import the spawn function from child_process module
// const path = require('path'); // Import path module for handling file paths
// const http = require('http');
// const WebSocket = require('ws');
// //
// const fs = require('fs');
// const csv = require('csv-parser');
// const cors = require('cors');
// //

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // Create an Express app
// const app = express();
// const port = 4000;

// //
// app.use(cors());
// //
// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON

//             // Check if any rfid_process has reached the value of 3
//             if (
//                 parsedData.rfid_process_1 === 3 ||
//                 parsedData.rfid_process_2 === 3 ||
//                 parsedData.rfid_process_3 === 3
//             ) {
//                 console.log('Triggering Python script as one of the processes reached 3');

//                 // Run the Python script
//                 const pythonProcess = spawn('python', ['D:/FYP_Web/FYP_Website/server/routes/defect_detection.py']); // Replace with your actual Python script path

//                 let pythonOutput = '';
//                 let pythonError = '';

//                 // Handle data from the Python script
//                 pythonProcess.stdout.on('data', (data) => {
//                     pythonOutput += data.toString(); // Accumulate output from the script
//                 });

//                 pythonProcess.stderr.on('data', (data) => {
//                     pythonError += data.toString(); // Accumulate errors from the script
//                 });

//                 pythonProcess.on('close', (code) => {
//                     console.log(`Python script exited with code ${code}`);
                    
//                     console.log(`Raw Python output: '${pythonOutput}'`); 

//                     if (code === 0) {
//                         try {
//                             const defectStatus = parseInt(pythonOutput.trim()); // Assuming the output is '0' or '1'
//                             console.log(`Defect Status: ${defectStatus}`);

//                             // Check if defectStatus is a valid number
//                             if (isNaN(defectStatus)) {
//                                 console.error('Defect Status is NaN');
//                             }

//                             // Fetch the three rows from the database
//                             db.query(
//                                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                                 (err, result) => {
//                                     if (err) {
//                                         console.error('Failed to fetch from database:', err);
//                                         return;
//                                     }

//                                     // Add the byproduct IDs and defect status to the data before sending it to the client
//                                     const updatedData = {
//                                         ...parsedData,
//                                         byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                                         defect_status: defectStatus, // Include the defect status
//                                     };

//                                     // Send the updated data to all clients
//                                     wss.clients.forEach(client => {
//                                         if (client.readyState === WebSocket.OPEN) {
//                                             client.send(JSON.stringify(updatedData));
//                                         }
//                                     });
//                                 }
//                             );
//                         } catch (error) {
//                             console.error('Failed to parse Python output:', error);
//                         }
//                     } else {
//                         console.error(`Python script error: ${pythonError}`);
//                     }
//                 });
//             } else {
//                 // If no condition is met, just fetch from the database
//                 db.query(
//                     `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                     (err, result) => {
//                         if (err) {
//                             console.error('Failed to fetch from database:', err);
//                             return;
//                         }

//                         // Add the byproduct IDs to the data before sending it to the client
//                         const updatedData = {
//                             ...parsedData,
//                             byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                             defect_status: null, // No defect status if script is not run
//                         };

//                         // Send the updated data to all clients
//                         wss.clients.forEach(client => {
//                             if (client.readyState === WebSocket.OPEN) {
//                                 client.send(JSON.stringify(updatedData));
//                             }
//                         });
//                     }
//                 );
//             }
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// // Serve the CSV file from the specified path


// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// app.get('/csv', (req, res) => {
//     console.log('Received request for /csv'); // Log to confirm the route is being accessed
  
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');
    
//     // Check if the file exists
//     fs.access(csvFilePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         console.error('CSV file does not exist:', err);
//         return res.status(404).send('CSV file not found'); // Send a 404 error if the file doesn't exist
//       }
  
//       // If file exists, proceed with reading and parsing it
//       const results = [];
      
//       fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//           console.log('Data being sent:', results); // Log the data to confirm it's ready
//           res.json(results); // Send the parsed data as JSON
//         })
//         .on('error', (err) => {
//           console.error('Error reading the CSV file:', err);
//           res.status(500).send('Error reading the CSV file'); // Send a 500 error if reading fails
//         });
//     });
//   });

  

// module.exports = hardwareRouter;



// // BUTTON
// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');
// const { spawn } = require('child_process'); // Import the spawn function from child_process module
// const path = require('path'); // Import path module for handling file paths
// const http = require('http');
// const WebSocket = require('ws');
// const fs = require('fs');
// const csv = require('csv-parser');
// const cors = require('cors');

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // Create an Express app
// const app = express();
// const port = 4000;

// app.use(cors());

// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON

//             // Check if any rfid_process has reached the value of 3
//             if (
//                 parsedData.rfid_process_1 === 3 ||
//                 parsedData.rfid_process_2 === 3 ||
//                 parsedData.rfid_process_3 === 3
//             ) {
//                 console.log('Triggering Python script as one of the processes reached 3');

//                 // Run the Python script
//                 const pythonProcess = spawn('python', ['D:/FYP_Web/FYP_Website/server/routes/defect_detection.py']); // Replace with your actual Python script path

//                 let pythonOutput = '';
//                 let pythonError = '';

//                 // Handle data from the Python script
//                 pythonProcess.stdout.on('data', (data) => {
//                     pythonOutput += data.toString(); // Accumulate output from the script
//                 });

//                 pythonProcess.stderr.on('data', (data) => {
//                     pythonError += data.toString(); // Accumulate errors from the script
//                 });

//                 pythonProcess.on('close', (code) => {
//                     console.log(`Python script exited with code ${code}`);

//                     console.log(`Raw Python output: '${pythonOutput}'`);

//                     if (code === 0) {
//                         try {
//                             const defectStatus = parseInt(pythonOutput.trim()); // Assuming the output is '0' or '1'
//                             console.log(`Defect Status: ${defectStatus}`);

//                             // Check if defectStatus is a valid number
//                             if (isNaN(defectStatus)) {
//                                 console.error('Defect Status is NaN');
//                             }

//                             // Fetch the three rows from the database
//                             db.query(
//                                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                                 (err, result) => {
//                                     if (err) {
//                                         console.error('Failed to fetch from database:', err);
//                                         return;
//                                     }

//                                     // Add the byproduct IDs and defect status to the data before sending it to the client
//                                     const updatedData = {
//                                         ...parsedData,
//                                         byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                                         defect_status: defectStatus, // Include the defect status
//                                     };

//                                     // Send the updated data to all clients
//                                     wss.clients.forEach(client => {
//                                         if (client.readyState === WebSocket.OPEN) {
//                                             client.send(JSON.stringify(updatedData));
//                                         }
//                                     });
//                                 }
//                             );
//                         } catch (error) {
//                             console.error('Failed to parse Python output:', error);
//                         }
//                     } else {
//                         console.error(`Python script error: ${pythonError}`);
//                     }
//                 });
//             } else {
//                 // If no condition is met, just fetch from the database
//                 db.query(
//                     `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                     (err, result) => {
//                         if (err) {
//                             console.error('Failed to fetch from database:', err);
//                             return;
//                         }

//                         // Add the byproduct IDs to the data before sending it to the client
//                         const updatedData = {
//                             ...parsedData,
//                             byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                             defect_status: null, // No defect status if script is not run
//                         };

//                         // Send the updated data to all clients
//                         wss.clients.forEach(client => {
//                             if (client.readyState === WebSocket.OPEN) {
//                                 client.send(JSON.stringify(updatedData));
//                             }
//                         });
//                     }
//                 );
//             }
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// // Serve the CSV file from the specified path
// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// // CSV Endpoint
// app.get('/csv', (req, res) => {
//     console.log('Received request for /csv'); // Log to confirm the route is being accessed
  
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');
    
//     // Check if the file exists
//     fs.access(csvFilePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         console.error('CSV file does not exist:', err);
//         return res.status(404).send('CSV file not found'); // Send a 404 error if the file doesn't exist
//       }
  
//       // If file exists, proceed with reading and parsing it
//       const results = [];
      
//       fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//           console.log('Data being sent:', results); // Log the data to confirm it's ready
//           res.json(results); // Send the parsed data as JSON
//         })
//         .on('error', (err) => {
//           console.error('Error reading the CSV file:', err);
//           res.status(500).send('Error reading the CSV file'); // Send a 500 error if reading fails
//         });
//     });
// });

// // Add endpoint to fetch missing components (decrease stock by 1)
// app.post('/fetch-missing-components', (req, res) => {
//     const updateQuery = 'UPDATE component_storage SET component_storage_current_stock = component_storage_current_stock - 1';

//     db.query(updateQuery, (err, result) => {
//         if (err) {
//             console.error('Error updating stock:', err);
//             return res.status(500).send('Failed to update stock');
//         }
//         console.log('Stock updated successfully');
//         res.status(200).send('Stock updated successfully');
//     });
// });

// module.exports = hardwareRouter;


// BUTTON 2:
// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');
// const { spawn } = require('child_process'); // Import the spawn function from child_process module
// const path = require('path'); // Import path module for handling file paths
// const http = require('http');
// const WebSocket = require('ws');
// const fs = require('fs');
// const csv = require('csv-parser');
// const cors = require('cors');

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // Create an Express app
// const app = express();
// const port = 4000;

// app.use(cors());

// // Map defect descriptions to component_storage_name
// const defectToStorageMap = {
//     "Missing wheels": "Wheels Storage",
//     "Missing frame": "Fork Storage",
//     "Missing seat": "Saddle Storage",
//     "Missing handle": "Handlebars storage",
//     "Missing pedals": "Pedals Storage",
// };

// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON

//             // Check if any rfid_process has reached the value of 3
//             if (
//                 parsedData.rfid_process_1 === 3 ||
//                 parsedData.rfid_process_2 === 3 ||
//                 parsedData.rfid_process_3 === 3
//             ) {
//                 console.log('Triggering Python script as one of the processes reached 3');

//                 // Run the Python script
//                 const pythonProcess = spawn('python', ['D:/FYP_Web/FYP_Website/server/routes/defect_detection.py']); // Replace with your actual Python script path

//                 let pythonOutput = '';
//                 let pythonError = '';

//                 // Handle data from the Python script
//                 pythonProcess.stdout.on('data', (data) => {
//                     pythonOutput += data.toString(); // Accumulate output from the script
//                 });

//                 pythonProcess.stderr.on('data', (data) => {
//                     pythonError += data.toString(); // Accumulate errors from the script
//                 });

//                 pythonProcess.on('close', (code) => {
//                     console.log(`Python script exited with code ${code}`);

//                     console.log(`Raw Python output: '${pythonOutput}'`);

//                     if (code === 0) {
//                         try {
//                             const defectStatus = parseInt(pythonOutput.trim()); // Assuming the output is '0' or '1'
//                             console.log(`Defect Status: ${defectStatus}`);

//                             // Check if defectStatus is a valid number
//                             if (isNaN(defectStatus)) {
//                                 console.error('Defect Status is NaN');
//                             }

//                             // Fetch the three rows from the database
//                             db.query(
//                                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                                 (err, result) => {
//                                     if (err) {
//                                         console.error('Failed to fetch from database:', err);
//                                         return;
//                                     }

//                                     // Add the byproduct IDs and defect status to the data before sending it to the client
//                                     const updatedData = {
//                                         ...parsedData,
//                                         byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                                         defect_status: defectStatus, // Include the defect status
//                                     };

//                                     // Send the updated data to all clients
//                                     wss.clients.forEach(client => {
//                                         if (client.readyState === WebSocket.OPEN) {
//                                             client.send(JSON.stringify(updatedData));
//                                         }
//                                     });
//                                 }
//                             );
//                         } catch (error) {
//                             console.error('Failed to parse Python output:', error);
//                         }
//                     } else {
//                         console.error(`Python script error: ${pythonError}`);
//                     }
//                 });
//             } else {
//                 // If no condition is met, just fetch from the database
//                 db.query(
//                     `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                     (err, result) => {
//                         if (err) {
//                             console.error('Failed to fetch from database:', err);
//                             return;
//                         }

//                         // Add the byproduct IDs to the data before sending it to the client
//                         const updatedData = {
//                             ...parsedData,
//                             byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
//                             defect_status: null, // No defect status if script is not run
//                         };

//                         // Send the updated data to all clients
//                         wss.clients.forEach(client => {
//                             if (client.readyState === WebSocket.OPEN) {
//                                 client.send(JSON.stringify(updatedData));
//                             }
//                         });
//                     }
//                 );
//             }
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// // Serve the CSV file from the specified path
// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// // CSV Endpoint
// app.get('/csv', (req, res) => {
//     console.log('Received request for /csv'); // Log to confirm the route is being accessed
  
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');
    
//     // Check if the file exists
//     fs.access(csvFilePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         console.error('CSV file does not exist:', err);
//         return res.status(404).send('CSV file not found'); // Send a 404 error if the file doesn't exist
//       }
  
//       // If file exists, proceed with reading and parsing it
//       const results = [];
      
//       fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//           console.log('Data being sent:', results); // Log the data to confirm it's ready
//           res.json(results); // Send the parsed data as JSON
//         })
//         .on('error', (err) => {
//           console.error('Error reading the CSV file:', err);
//           res.status(500).send('Error reading the CSV file'); // Send a 500 error if reading fails
//         });
//     });
// });

// // Route to handle "fetch missing components" button
// app.post('/fetch-missing-components', (req, res) => {
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');

//     // Check if the file exists
//     fs.access(csvFilePath, fs.constants.F_OK, (err) => {
//         if (err) {
//             console.error('CSV file does not exist:', err);
//             return res.status(404).send('CSV file not found');
//         }

//         const results = [];

//         // Read and parse the CSV file
//         fs.createReadStream(csvFilePath)
//             .pipe(csv())
//             .on('data', (data) => results.push(data))
//             .on('end', () => {
//                 const queries = [];

//                 // For each row in the CSV
//                 results.forEach(row => {
//                     const defectDescription = row['Defect Description'];
//                     const missingCount = parseInt(row['Missing Count'], 10);

//                     // Find the corresponding storage name
//                     const storageName = defectToStorageMap[defectDescription];

//                     if (storageName && !isNaN(missingCount)) {
//                         // Update query for the database
//                         const query = `
//                             UPDATE component_storage 
//                             SET component_storage_current_stock = GREATEST(component_storage_current_stock - ?, 0) 
//                             WHERE component_storage_name = ?
//                         `;
//                         queries.push([query, [missingCount, storageName]]);
//                     }
//                 });

//                 // Execute all the queries
//                 let completedQueries = 0;

//                 queries.forEach(([query, params]) => {
//                     db.query(query, params, (err, result) => {
//                         completedQueries++;

//                         if (err) {
//                             console.error('Failed to update database:', err);
//                         }

//                         // Send response when all queries are completed
//                         if (completedQueries === queries.length) {
//                             res.send('Database updated based on CSV data.');
//                         }
//                     });
//                 });
//             })
//             .on('error', (err) => {
//                 console.error('Error reading the CSV file:', err);
//                 res.status(500).send('Error reading the CSV file');
//             });
//     });
// });

// module.exports = hardwareRouter;


// isproduced=1
// const express = require('express');
// const hardwareRouter = express.Router();
// const mysql = require('mysql2');
// const { spawn } = require('child_process'); // Import the spawn function from child_process module
// const path = require('path'); // Import path module for handling file paths
// const http = require('http');
// const WebSocket = require('ws');
// const fs = require('fs');
// const csv = require('csv-parser');
// const cors = require('cors');

// // Create the database connection
// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: 'password',
//     database: 'supply_chain',
// });

// // Create an Express app
// const app = express();
// const port = 4000;

// app.use(cors());

// // Map defect descriptions to component_storage_name
// const defectToStorageMap = {
//     "Missing wheels": "Wheels Storage",
//     "Missing frame": "Fork Storage",
//     "Missing seat": "Saddle Storage",
//     "Missing handle": "Handlebars storage",
//     "Missing pedals": "Pedals Storage",
// };

// // Create an HTTP server
// const server = http.createServer(app);

// // Set up WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on('connection', ws => {
//     console.log('Client connected');

//     ws.on('message', message => {
//         const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
//         console.log('Decoded data:', decodedMessage);

//         try {
//             const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON

//             // Fetch the three rows from the database to map rfid_process values to byproduct_ids
//             db.query(
//                 `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
//                 (err, result) => {
//                     if (err) {
//                         console.error('Failed to fetch from database:', err);
//                         return;
//                     }

//                     // Extract the byproduct_ids and map them to rfid_process indices
//                     const byproductIds = result.map(row => row.byproduct_id);
//                     console.log('Fetched byproduct_ids:', byproductIds);

//                     // Always send the byproduct_ids along with the parsed data
//                     const updatedData = {
//                         ...parsedData,
//                         byproduct_ids: byproductIds,
//                     };

//                     // Send the updated data to all clients
//                     wss.clients.forEach(client => {
//                         if (client.readyState === WebSocket.OPEN) {
//                             client.send(JSON.stringify(updatedData));
//                         }
//                     });

//                     // Check if any rfid_process has reached the value of 3
//                     if (
//                         parsedData.rfid_process_1 === 3 ||
//                         parsedData.rfid_process_2 === 3 ||
//                         parsedData.rfid_process_3 === 3
//                     ) {
//                         console.log('Triggering update for byproduct_id since one of the processes reached 3');

//                         // Determine which rfid_process reached 3 and get the corresponding byproduct_id
//                         let updatedByproductId = null;
//                         let updatedIndex = -1; // To store the index of the process that reached 3
//                         if (parsedData.rfid_process_1 === 3) {
//                             updatedByproductId = byproductIds[0];
//                             updatedIndex = 0;
//                         } else if (parsedData.rfid_process_2 === 3) {
//                             updatedByproductId = byproductIds[1];
//                             updatedIndex = 1;
//                         } else if (parsedData.rfid_process_3 === 3) {
//                             updatedByproductId = byproductIds[2];
//                             updatedIndex = 2;
//                         }

//                         if (updatedByproductId) {
//                             console.log(`Updating isproduced for byproduct_id: ${updatedByproductId}`);

//                             // Update the database for the specific byproduct_id
//                             db.query(
//                                 `UPDATE produced_byproduct SET isproduced = 1 WHERE byproduct_id = ?`,
//                                 [updatedByproductId],
//                                 (err, updateResult) => {
//                                     if (err) {
//                                         console.error('Failed to update isproduced:', err);
//                                         return;
//                                     }
//                                     console.log(`Successfully updated isproduced for byproduct_id: ${updatedByproductId}`);

//                                     // Now, fetch the next available byproduct_id to replace the updated one
//                                     db.query(
//                                         `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 1`,
//                                         (err, newResult) => {
//                                             if (err) {
//                                                 console.error('Failed to fetch next byproduct_id:', err);
//                                                 return;
//                                             }

//                                             const newByproductId = newResult.length > 0 ? newResult[0].byproduct_id : null;
//                                             if (newByproductId) {
//                                                 // Replace the updated byproduct_id with the new one
//                                                 const updatedByproductIds = [...byproductIds];
//                                                 updatedByproductIds[updatedIndex] = newByproductId;

//                                                 // Send updated data to clients with the new byproduct_id list
//                                                 const updatedDataWithNew = {
//                                                     ...parsedData,
//                                                     byproduct_ids: updatedByproductIds,
//                                                 };

//                                                 wss.clients.forEach(client => {
//                                                     if (client.readyState === WebSocket.OPEN) {
//                                                         client.send(JSON.stringify(updatedDataWithNew));
//                                                     }
//                                                 });
//                                             }
//                                         }
//                                     );
//                                 }
//                             );
//                         }
//                     }
//                 }
//             );
//         } catch (error) {
//             console.error('Failed to parse JSON:', error);
//         }
//     });

//     ws.send('Connection established');
// });

// // Serve the CSV file from the specified path
// console.log(`WebSocket server is running on ws://localhost:${port}`);
// server.listen(port, '0.0.0.0', () => {
//     console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
// });

// // CSV Endpoint
// app.get('/csv', (req, res) => {
//     console.log('Received request for /csv'); // Log to confirm the route is being accessed
  
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');
    
//     // Check if the file exists
//     fs.access(csvFilePath, fs.constants.F_OK, (err) => {
//       if (err) {
//         console.error('CSV file does not exist:', err);
//         return res.status(404).send('CSV file not found'); // Send a 404 error if the file doesn't exist
//       }
  
//       // If file exists, proceed with reading and parsing it
//       const results = [];
      
//       fs.createReadStream(csvFilePath)
//         .pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => {
//           console.log('Data being sent:', results); // Log the data to confirm it's ready
//           res.json(results); // Send the parsed data as JSON
//         })
//         .on('error', (err) => {
//           console.error('Error reading the CSV file:', err);
//           res.status(500).send('Error reading the CSV file'); // Send a 500 error if reading fails
//         });
//     });
// });

// // Route to handle "fetch missing components" button
// app.post('/fetch-missing-components', (req, res) => {
//     const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');

//     // Check if the file exists
//     fs.access(csvFilePath, fs.constants.F_OK, (err) => {
//         if (err) {
//             console.error('CSV file does not exist:', err);
//             return res.status(404).send('CSV file not found');
//         }

//         const results = [];

//         // Read and parse the CSV file
//         fs.createReadStream(csvFilePath)
//             .pipe(csv())
//             .on('data', (data) => results.push(data))
//             .on('end', () => {
//                 const queries = [];

//                 // For each row in the CSV
//                 results.forEach(row => {
//                     const defectDescription = row['Defect Description'];
//                     const missingCount = parseInt(row['Missing Count'], 10);

//                     // Find the corresponding storage name
//                     const storageName = defectToStorageMap[defectDescription];

//                     if (storageName && !isNaN(missingCount)) {
//                         // Update query for the database
//                         const query = `
//                             UPDATE component_storage 
//                             SET component_storage_current_stock = GREATEST(component_storage_current_stock - ?, 0) 
//                             WHERE component_storage_name = ?
//                         `;
//                         queries.push([query, [missingCount, storageName]]);
//                     }
//                 });

//                 // Execute all the queries
//                 let completedQueries = 0;

//                 queries.forEach(([query, params]) => {
//                     db.query(query, params, (err, result) => {
//                         completedQueries++;

//                         if (err) {
//                             console.error('Failed to update database:', err);
//                         }

//                         // Send response when all queries are completed
//                         if (completedQueries === queries.length) {
//                             res.send('Database updated based on CSV data.');
//                         }
//                     });
//                 });
//             })
//             .on('error', (err) => {
//                 console.error('Error reading the CSV file:', err);
//                 res.status(500).send('Error reading the CSV file');
//             });
//     });
// });

// module.exports = hardwareRouter;


// FIX MAPPING
const express = require('express');
const hardwareRouter = express.Router();
const mysql = require('mysql2');
const { spawn } = require('child_process'); // Import the spawn function from child_process module
const path = require('path'); // Import path module for handling file paths
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');

// Create the database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'supply_chain',
});

// Create an Express app
const app = express();
const port = 4000;

app.use(cors());

// Map defect descriptions to component_storage_name
const defectToStorageMap = {
    "Missing wheels": "Wheels Storage",
    "Missing frame": "Fork Storage",
    "Missing seat": "Saddle Storage",
    "Missing handle": "Handlebars storage",
    "Missing pedals": "Pedals Storage",
};

// Create an HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected');

    let byproductIds = []; // To store product IDs

    ws.on('message', message => {
        const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
        console.log('Decoded data:', decodedMessage);

        try {
            const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON
        
            // If byproductIds has not been set, fetch the initial values from the database
            if (byproductIds.length === 0) {
                db.query(
                    `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
                    (err, result) => {
                        if (err) {
                            console.error('Failed to fetch from database:', err);
                            return;
                        }
        
                        // Extract the byproduct_ids and map them to rfid_process indices
                        byproductIds = result.map(row => row.byproduct_id);
                        console.log('Fetched byproduct_ids:', byproductIds);
        
                        // Send the updated data (including byproduct_ids) to all clients
                        const updatedData = {
                            ...parsedData,
                            byproduct_ids: byproductIds,
                        };
        
                        // Send the updated data to all connected clients
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(updatedData));
                            }
                        });
                    }
                );
            } else {
                // Check if any rfid_process has reached the value of 3
                let updatedByproductId = null;
                let updatedIndex = -1;
        
                if (parsedData.rfid_process_1 === 3) {
                    updatedByproductId = byproductIds[0];
                    updatedIndex = 0;
                } else if (parsedData.rfid_process_2 === 3) {
                    updatedByproductId = byproductIds[1];
                    updatedIndex = 1;
                } else if (parsedData.rfid_process_3 === 3) {
                    updatedByproductId = byproductIds[2];
                    updatedIndex = 2;
                }
        
                if (updatedByproductId) {
                    console.log(`Updating isproduced for byproduct_id: ${updatedByproductId}`);
        
                    // Update the database for the specific byproduct_id
                    db.query(
                        `UPDATE produced_byproduct SET isproduced = 1 WHERE byproduct_id = ?`,
                        [updatedByproductId],
                        (err, updateResult) => {
                            if (err) {
                                console.error('Failed to update isproduced:', err);
                                return;
                            }
                            console.log(`Successfully updated isproduced for byproduct_id: ${updatedByproductId}`);
        
                            // Trigger Python script when RFID process reaches 3
                            console.log('Triggering Python script as one of the processes reached 3');
        
                            const pythonProcess = spawn('python', ['D:/FYP_Web/FYP_Website/server/routes/defect_detection.py']); // Replace with your actual Python script path
        
                            let pythonOutput = '';
                            let pythonError = '';
        
                            // Handle data from the Python script
                            pythonProcess.stdout.on('data', (data) => {
                                pythonOutput += data.toString(); // Accumulate output from the script
                            });
        
                            pythonProcess.stderr.on('data', (data) => {
                                pythonError += data.toString(); // Accumulate errors from the script
                            });
        
                            pythonProcess.on('close', (code) => {
                                console.log(`Python script exited with code ${code}`);
        
                                // Log the raw Python output for debugging
                                console.log(`Raw Python output: '${pythonOutput}'`);
        
                                if (code === 0) {
                                    try {
                                        // Assuming the Python script returns '0' or '1' as defect status
                                        const defectStatus = parseInt(pythonOutput.trim()); 
                                        console.log(`Defect Status: ${defectStatus}`);
        
                                        // Check if defectStatus is a valid number
                                        if (isNaN(defectStatus)) {
                                            console.error('Defect Status is NaN');
                                        } else {
                                            // Handle the defect status based on the returned value
                                            if (defectStatus === 1) {
                                                console.log('Defect detected!');
                                            } else {
                                                console.log('No defect detected.');
                                            }
                                        }
                                    } catch (parseError) {
                                        console.error('Failed to parse Python output:', parseError);
                                    }
                                } else {
                                    // If the Python script fails, log the error
                                    console.error(`Python script failed with error: ${pythonError}`);
                                }
                            });
        
                            // Now, fetch the next available byproduct_id to replace the updated one
                            let newByproductId = null;
                            const maxId = Math.max(...byproductIds); // Get the largest ID in progress bars
        
                            // Repeat the query until we find a byproduct_id that isn't already in byproductIds
                            const fetchNewId = () => {
                                db.query(
                                    `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 AND byproduct_id > ? ORDER BY byproduct_id LIMIT 1`,
                                    [maxId],
                                    (err, newResult) => {
                                        if (err) {
                                            console.error('Failed to fetch next byproduct_id:', err);
                                            return;
                                        }
        
                                        newByproductId = newResult.length > 0 ? newResult[0].byproduct_id : null;
        
                                        // Check if the new ID is already in byproductIds
                                        if (newByproductId && byproductIds.includes(newByproductId)) {
                                            console.log(`New byproduct_id ${newByproductId} is already in progress bars, fetching next...`);
                                            fetchNewId(); // Recursively fetch the next ID
                                        } else {
                                            if (newByproductId) {
                                                // Replace the updated byproduct_id with the new one in the correct index
                                                console.log(`Replacing finished byproduct_id: ${updatedByproductId} with new byproduct_id: ${newByproductId}`);
                                                byproductIds[updatedIndex] = newByproductId;
        
                                                // Send updated data (including updated byproduct_ids) to clients
                                                const updatedDataWithNew = {
                                                    ...parsedData,
                                                    byproduct_ids: byproductIds,  // Always include byproduct_ids
                                                };
        
                                                wss.clients.forEach(client => {
                                                    if (client.readyState === WebSocket.OPEN) {
                                                        client.send(JSON.stringify(updatedDataWithNew));
                                                    }
                                                });
                                            } else {
                                                console.log('No new byproduct_id available, skipping update.');
                                                // If no new byproduct_id is available, send the data without change
                                                const updatedDataNoChange = {
                                                    ...parsedData,
                                                    byproduct_ids: byproductIds,  // Include the same byproduct_ids
                                                };
        
                                                wss.clients.forEach(client => {
                                                    if (client.readyState === WebSocket.OPEN) {
                                                        client.send(JSON.stringify(updatedDataNoChange));
                                                    }
                                                });
                                            }
                                        }
                                    }
                                );
                            };
        
                            fetchNewId(); // Call the recursive function to fetch a valid ID
                        }
                    );
                } else {
                    // If no update is required, simply send the data along with byproduct_ids to clients
                    const updatedDataWithIds = {
                        ...parsedData,
                        byproduct_ids: byproductIds,
                    };
        
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(updatedDataWithIds));
                        }
                    });
                }
            }
        } catch (error) {
            console.error('Failed to parse JSON:', error);
        }               
    });

    ws.send('Connection established');
});

// Serve the CSV file from the specified path
console.log(`WebSocket server is running on ws://localhost:${port}`);
server.listen(port, '0.0.0.0', () => {
    console.log(`WebSocket server is running on ws://0.0.0.0:${port}`);
});

// CSV Endpoint
app.get('/csv', (req, res) => {
    console.log('Received request for /csv'); // Log to confirm the route is being accessed
  
    const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');
    
    // Check if the file exists
    fs.access(csvFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('CSV file does not exist:', err);
        return res.status(404).send('CSV file not found'); // Send a 404 error if the file doesn't exist
      }
  
      // If file exists, proceed with reading and parsing it
      const results = [];
      
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log('Data being sent:', results); // Log the data to confirm it's ready
          res.json(results); // Send the parsed data as JSON
        })
        .on('error', (err) => {
          console.error('Error reading the CSV file:', err);
          res.status(500).send('Error reading the CSV file'); // Send a 500 error if reading fails
        });
    });
});

// Route to handle "fetch missing components" button
app.post('/fetch-missing-components', (req, res) => {
    const csvFilePath = path.join('D:', 'FYP_Web', 'FYP_Website', 'server', 'df.csv');

    // Check if the file exists
    fs.access(csvFilePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('CSV file does not exist:', err);
            return res.status(404).send('CSV file not found');
        }

        const results = [];

        // Read and parse the CSV file
        fs.createReadStream(csvFilePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const queries = [];

                // For each row in the CSV
                results.forEach(row => {
                    const defectDescription = row['Defect Description'];
                    const missingCount = parseInt(row['Missing Count'], 10);

                    // Find the corresponding storage name
                    const storageName = defectToStorageMap[defectDescription];

                    if (storageName && !isNaN(missingCount)) {
                        // Update query for the database
                        const query = `
                            UPDATE component_storage 
                            SET component_storage_current_stock = GREATEST(component_storage_current_stock - ?, 0) 
                            WHERE component_storage_name = ?
                        `;
                        queries.push([query, [missingCount, storageName]]);
                    }
                });

                // Execute all the queries
                let completedQueries = 0;

                queries.forEach(([query, params]) => {
                    db.query(query, params, (err, result) => {
                        completedQueries++;

                        if (err) {
                            console.error('Failed to update database:', err);
                        }

                        // Send response when all queries are completed
                        if (completedQueries === queries.length) {
                            res.send('Database updated based on CSV data.');
                        }
                    });
                });
            })
            .on('error', (err) => {
                console.error('Error reading the CSV file:', err);
                res.status(500).send('Error reading the CSV file');
            });
    });
});

module.exports = hardwareRouter;
