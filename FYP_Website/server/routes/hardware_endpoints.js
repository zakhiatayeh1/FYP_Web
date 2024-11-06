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
const express = require('express');
const hardwareRouter = express.Router();
const mysql = require('mysql2');
const { spawn } = require('child_process'); // Import the spawn function from child_process module
const path = require('path'); // Import path module for handling file paths
const http = require('http');
const WebSocket = require('ws');
//
const fs = require('fs');
const csv = require('csv-parser');
const cors = require('cors');
//

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

//
app.use(cors());
//
// Create an HTTP server
const server = http.createServer(app);

// Set up WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        const decodedMessage = message.toString('utf8'); // Convert Buffer to UTF-8 string
        console.log('Decoded data:', decodedMessage);

        try {
            const parsedData = JSON.parse(decodedMessage); // Parse the string as JSON

            // Check if any rfid_process has reached the value of 3
            if (
                parsedData.rfid_process_1 === 3 ||
                parsedData.rfid_process_2 === 3 ||
                parsedData.rfid_process_3 === 3
            ) {
                console.log('Triggering Python script as one of the processes reached 3');

                // Run the Python script
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
                    
                    console.log(`Raw Python output: '${pythonOutput}'`); 

                    if (code === 0) {
                        try {
                            const defectStatus = parseInt(pythonOutput.trim()); // Assuming the output is '0' or '1'
                            console.log(`Defect Status: ${defectStatus}`);

                            // Check if defectStatus is a valid number
                            if (isNaN(defectStatus)) {
                                console.error('Defect Status is NaN');
                            }

                            // Fetch the three rows from the database
                            db.query(
                                `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
                                (err, result) => {
                                    if (err) {
                                        console.error('Failed to fetch from database:', err);
                                        return;
                                    }

                                    // Add the byproduct IDs and defect status to the data before sending it to the client
                                    const updatedData = {
                                        ...parsedData,
                                        byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
                                        defect_status: defectStatus, // Include the defect status
                                    };

                                    // Send the updated data to all clients
                                    wss.clients.forEach(client => {
                                        if (client.readyState === WebSocket.OPEN) {
                                            client.send(JSON.stringify(updatedData));
                                        }
                                    });
                                }
                            );
                        } catch (error) {
                            console.error('Failed to parse Python output:', error);
                        }
                    } else {
                        console.error(`Python script error: ${pythonError}`);
                    }
                });
            } else {
                // If no condition is met, just fetch from the database
                db.query(
                    `SELECT byproduct_id FROM produced_byproduct WHERE isproduced = 0 ORDER BY byproduct_id LIMIT 3`,
                    (err, result) => {
                        if (err) {
                            console.error('Failed to fetch from database:', err);
                            return;
                        }

                        // Add the byproduct IDs to the data before sending it to the client
                        const updatedData = {
                            ...parsedData,
                            byproduct_ids: result.map(row => row.byproduct_id), // Extract the byproduct IDs
                            defect_status: null, // No defect status if script is not run
                        };

                        // Send the updated data to all clients
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN) {
                                client.send(JSON.stringify(updatedData));
                            }
                        });
                    }
                );
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

  

module.exports = hardwareRouter;



