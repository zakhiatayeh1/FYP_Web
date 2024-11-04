// WITHOUT QUERY

// import React, { useState, useEffect } from 'react';

// const Hardware = () => {
//   const [receivedData, setReceivedData] = useState(null);
//   const [motionAlert, setMotionAlert] = useState(false); // State for motion alert

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:4000'); // Match this with your WebSocket server URL

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     ws.onmessage = (event) => {
//       console.log('Received data from server:', event.data); // Log raw data

//       try {
//         const parsedData = JSON.parse(event.data);
//         setReceivedData(parsedData); // Update the state with the latest data

//         // Check motion detection and set alert
//         if (parsedData.motion_detection === 1) {
//           setMotionAlert(true);
//         } else {
//           setMotionAlert(false);
//         }
//       } catch (error) {
//         console.log('Failed to parse JSON:', event.data);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const getProgressBarWidth = (counter) => {
//     switch (counter) {
//       case 0: return '0%';
//       case 1: return '33%';
//       case 2: return '66%';
//       case 3: return '100%';
//       default: return '0%';
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Hardware Data</h1>

//       {/* Motion Detection Alert */}
//       {motionAlert && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ffcccc', color: '#a00', border: '1px solid #a00', borderRadius: '5px' }}>
//           <strong>Alert:</strong> Motion detected!
//         </div>
//       )}

//       {receivedData ? (
//         <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Temperature:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.temperature} °C</p>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Humidity:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.humidity} %</p>

//           {/* First Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Process 1:</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_1), // Use the first counter
//                 backgroundColor: '#76c7c0',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>

//           {/* Second Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Process 2:</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_2), // Use the second counter
//                 backgroundColor: '#ffa500', // Change color for differentiation
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>

//           {/* Third Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Process 3:</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_3), // Use the third counter
//                 backgroundColor: '#ff6347', // Change color for differentiation
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>
//         </div>
//       ) : (
//         <p>No data received yet...</p>
//       )}
//     </div>
//   );
// };

// export default Hardware;












// CODE 2: WiTH CONSTANT QUERY
// import React, { useState, useEffect } from 'react';

// const Hardware = () => {
//   const [receivedData, setReceivedData] = useState(null);
//   const [motionAlert, setMotionAlert] = useState(false); // State for motion alert
//   const [processComplete, setProcessComplete] = useState({
//     process1: false,
//     process2: false,
//     process3: false,
//   }); // State to track process completion

//   // Effect to check for completed processes and reset notifications
//   useEffect(() => {
//     if (receivedData) {
//       // Check if each process is completed and trigger notification
//       if (receivedData.rfid_process_1 === 3 && !processComplete.process1) {
//         setProcessComplete(prev => ({ ...prev, process1: true }));
//       } else if (receivedData.rfid_process_1 === 0 && processComplete.process1) {
//         setProcessComplete(prev => ({ ...prev, process1: false })); // Reset notification
//       }

//       if (receivedData.rfid_process_2 === 3 && !processComplete.process2) {
//         setProcessComplete(prev => ({ ...prev, process2: true }));
//       } else if (receivedData.rfid_process_2 === 0 && processComplete.process2) {
//         setProcessComplete(prev => ({ ...prev, process2: false })); // Reset notification
//       }

//       if (receivedData.rfid_process_3 === 3 && !processComplete.process3) {
//         setProcessComplete(prev => ({ ...prev, process3: true }));
//       } else if (receivedData.rfid_process_3 === 0 && processComplete.process3) {
//         setProcessComplete(prev => ({ ...prev, process3: false })); // Reset notification
//       }
//     }
//   }, [receivedData, processComplete]); // Dependencies include receivedData and processComplete

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:4000'); // Match this with your WebSocket server URL

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     ws.onmessage = (event) => {
//       console.log('Received data from server:', event.data); // Log raw data

//       try {
//         const parsedData = JSON.parse(event.data);
//         setReceivedData(parsedData); // Update the state with the latest data

//         // Check motion detection and set alert
//         if (parsedData.motion_detection === 1) {
//           setMotionAlert(true);
//         } else {
//           setMotionAlert(false);
//         }
//       } catch (error) {
//         console.log('Failed to parse JSON:', event.data);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const getProgressBarWidth = (counter) => {
//     switch (counter) {
//       case 0: return '0%';
//       case 1: return '33%';
//       case 2: return '66%';
//       case 3: return '100%';
//       default: return '0%';
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Hardware Data</h1>

//       {/* Motion Detection Alert */}
//       {motionAlert && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ffcccc', color: '#a00', border: '1px solid #a00', borderRadius: '5px' }}>
//           <strong>Alert:</strong> Motion detected!
//         </div>
//       )}

//       {/* Notification for process completion */}
//       {receivedData && processComplete.process1 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[0]} has been completed!
//         </div>
//       )}
//       {receivedData && processComplete.process2 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[1]} has been completed!
//         </div>
//       )}
//       {receivedData && processComplete.process3 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[2]} has been completed!
//         </div>
//       )}

//       {receivedData ? (
//         <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Temperature:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.temperature} °C</p>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Humidity:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.humidity} %</p>

//           {/* First Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[0]}</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_1),
//                 backgroundColor: '#76c7c0',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>

//           {/* Second Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[1]}</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_2),
//                 backgroundColor: '#ffa500',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>

//           {/* Third Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[2]}</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_3),
//                 backgroundColor: '#ff6347',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>
//         </div>
//       ) : (
//         <p>No data received yet...</p>
//       )}
//     </div>
//   );
// };

// export default Hardware;





// COMPUTER VISION (????)

// import React, { useState, useEffect } from 'react';

// const Hardware = () => {
//   const [receivedData, setReceivedData] = useState(null);
//   const [motionAlert, setMotionAlert] = useState(false); // State for motion alert
//   const [processComplete, setProcessComplete] = useState({
//     process1: false,
//     process2: false,
//     process3: false,
//   }); // State to track process completion
//   const [defectStatus, setDefectStatus] = useState(null); // State for defect status

//   // Effect to check for completed processes and reset notifications
//   useEffect(() => {
//     if (receivedData) {
//       // Check if each process is completed and trigger notification
//       if (receivedData.rfid_process_1 === 3 && !processComplete.process1) {
//         setProcessComplete(prev => ({ ...prev, process1: true }));
//       } else if (receivedData.rfid_process_1 === 0 && processComplete.process1) {
//         setProcessComplete(prev => ({ ...prev, process1: false })); // Reset notification
//       }

//       if (receivedData.rfid_process_2 === 3 && !processComplete.process2) {
//         setProcessComplete(prev => ({ ...prev, process2: true }));
//       } else if (receivedData.rfid_process_2 === 0 && processComplete.process2) {
//         setProcessComplete(prev => ({ ...prev, process2: false })); // Reset notification
//       }

//       if (receivedData.rfid_process_3 === 3 && !processComplete.process3) {
//         setProcessComplete(prev => ({ ...prev, process3: true }));
//       } else if (receivedData.rfid_process_3 === 0 && processComplete.process3) {
//         setProcessComplete(prev => ({ ...prev, process3: false })); // Reset notification
//       }

//       // Set defect status based on received data
//       if (receivedData.defect_status !== undefined) {
//         setDefectStatus(receivedData.defect_status);
//       }
//     }
//   }, [receivedData, processComplete]); // Dependencies include receivedData and processComplete

//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:4000'); // Match this with your WebSocket server URL

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     ws.onmessage = (event) => {
//       console.log('Received data from server:', event.data); // Log raw data

//       try {
//         const parsedData = JSON.parse(event.data);
//         setReceivedData(parsedData); // Update the state with the latest data

//         // Check motion detection and set alert
//         if (parsedData.motion_detection === 1) {
//           setMotionAlert(true);
//         } else {
//           setMotionAlert(false);
//         }
//       } catch (error) {
//         console.log('Failed to parse JSON:', event.data);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const getProgressBarWidth = (counter) => {
//     switch (counter) {
//       case 0: return '0%';
//       case 1: return '33%';
//       case 2: return '66%';
//       case 3: return '100%';
//       default: return '0%';
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Hardware Data</h1>

//       {/* Motion Detection Alert */}
//       {motionAlert && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ffcccc', color: '#a00', border: '1px solid #a00', borderRadius: '5px' }}>
//           <strong>Alert:</strong> Motion detected!
//         </div>
//       )}

//       {/* Defect Status Notification */}
//       {defectStatus !== null && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: defectStatus === 1 ? '#ccffcc' : '#ffcccc', color: defectStatus === 1 ? '#080' : '#a00', border: `1px solid ${defectStatus === 1 ? '#080' : '#a00'}`, borderRadius: '5px' }}>
//           <strong>Notification:</strong> {defectStatus === 1 ? 'No defect detected!' : 'Warning: Defect detected!'}
//         </div>
//       )}

//       {/* Notification for process completion */}
//       {receivedData && processComplete.process1 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[0]} has been completed!
//         </div>
//       )}
//       {receivedData && processComplete.process2 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[1]} has been completed!
//         </div>
//       )}
//       {receivedData && processComplete.process3 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[2]} has been completed!
//         </div>
//       )}

//       {receivedData ? (
//         <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Temperature:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.temperature} °C</p>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Humidity:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.humidity} %</p>

//           {/* First Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[0]}</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_1),
//                 backgroundColor: '#76c7c0',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>

//           {/* Second Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[1]}</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_2),
//                 backgroundColor: '#ffa500',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>

//           {/* Third Counter Progress Bar */}
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[2]}</p>
//           <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
//             <div
//               style={{
//                 height: '100%',
//                 width: getProgressBarWidth(receivedData.rfid_process_3),
//                 backgroundColor: '#ff6347',
//                 transition: 'width 0.5s ease-in-out'
//               }}
//             />
//           </div>
//         </div>
//       ) : (
//         <p>No data received yet...</p>
//       )}
//     </div>
//   );
// };

// export default Hardware;


// CSV
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const Hardware = () => {
  const [receivedData, setReceivedData] = useState(null);
  const [motionAlert, setMotionAlert] = useState(false); // State for motion alert
  const [processComplete, setProcessComplete] = useState({
    process1: false,
    process2: false,
    process3: false,
  }); // State to track process completion
  const [defectStatus, setDefectStatus] = useState(null); // State for defect status
  const [csvData, setCsvData] = useState([]);

  // Effect to check for completed processes and reset notifications
  useEffect(() => {
    if (receivedData) {
      // Check if each process is completed and trigger notification
      if (receivedData.rfid_process_1 === 3 && !processComplete.process1) {
        setProcessComplete(prev => ({ ...prev, process1: true }));
      } else if (receivedData.rfid_process_1 === 0 && processComplete.process1) {
        setProcessComplete(prev => ({ ...prev, process1: false })); // Reset notification
      }

      if (receivedData.rfid_process_2 === 3 && !processComplete.process2) {
        setProcessComplete(prev => ({ ...prev, process2: true }));
      } else if (receivedData.rfid_process_2 === 0 && processComplete.process2) {
        setProcessComplete(prev => ({ ...prev, process2: false })); // Reset notification
      }

      if (receivedData.rfid_process_3 === 3 && !processComplete.process3) {
        setProcessComplete(prev => ({ ...prev, process3: true }));
      } else if (receivedData.rfid_process_3 === 0 && processComplete.process3) {
        setProcessComplete(prev => ({ ...prev, process3: false })); // Reset notification
      }

      // Set defect status based on received data
      if (receivedData.defect_status !== undefined) {
        setDefectStatus(receivedData.defect_status);
      }
    }
  }, [receivedData, processComplete]); // Dependencies include receivedData and processComplete

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000'); // Match this with your WebSocket server URL

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      console.log('Received data from server:', event.data); // Log raw data

      try {
        const parsedData = JSON.parse(event.data);
        setReceivedData(parsedData); // Update the state with the latest data

        // Check motion detection and set alert
        if (parsedData.motion_detection === 1) {
          setMotionAlert(true);
        } else {
          setMotionAlert(false);
        }
      } catch (error) {
        console.log('Failed to parse JSON:', event.data);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCsvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          console.log('Parsed CSV data:', results.data);
          setCsvData(results.data); // Set parsed CSV data to state
        },
        header: true, // Assuming the first row is headers
      });
    }
  };

  const getProgressBarWidth = (counter) => {
    switch (counter) {
      case 0: return '0%';
      case 1: return '33%';
      case 2: return '66%';
      case 3: return '100%';
      default: return '0%';
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hardware Data</h1>

      {/* Motion Detection Alert */}
      {motionAlert && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ffcccc', color: '#a00', border: '1px solid #a00', borderRadius: '5px' }}>
          <strong>Alert:</strong> Motion detected!
        </div>
      )}

      {/* Defect Status Notification */}
      {defectStatus !== null && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: defectStatus === 1 ? '#ccffcc' : '#ffcccc', color: defectStatus === 1 ? '#080' : '#a00', border: `1px solid ${defectStatus === 1 ? '#080' : '#a00'}`, borderRadius: '5px' }}>
          <strong>Notification:</strong> {defectStatus === 1 ? 'No defect detected!' : 'Warning: Defect detected!'}
        </div>
      )}

      {/* Notification for process completion */}
      {receivedData && processComplete.process1 && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
          <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[0]} has been completed!
        </div>
      )}
      {receivedData && processComplete.process2 && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
          <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[1]} has been completed!
        </div>
      )}
      {receivedData && processComplete.process3 && (
        <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
          <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[2]} has been completed!
        </div>
      )}

      {receivedData ? (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Temperature:</p>
          <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.temperature} °C</p>
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Humidity:</p>
          <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.humidity} %</p>

          {/* First Counter Progress Bar */}
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[0]}</p>
          <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
            <div
              style={{
                height: '100%',
                width: getProgressBarWidth(receivedData.rfid_process_1),
                backgroundColor: '#76c7c0',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>

          {/* Second Counter Progress Bar */}
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[1]}</p>
          <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
            <div
              style={{
                height: '100%',
                width: getProgressBarWidth(receivedData.rfid_process_2),
                backgroundColor: '#ffa500',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>

          {/* Third Counter Progress Bar */}
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[2]}</p>
          <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: getProgressBarWidth(receivedData.rfid_process_3),
                backgroundColor: '#ff6347',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>
        </div>
      ) : (
        <p>No data received yet...</p>
      )}

      {/* CSV File Upload */}
      <div style={{ margin: '20px 0' }}>
        <input type="file" accept=".csv" onChange={handleCsvUpload} />
      </div>

      {/* Display CSV Data */}
      {csvData.length > 0 && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
          <h2>CSV Data</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {Object.keys(csvData[0]).map((key) => (
                  <th key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx} style={{ border: '1px solid #ccc', padding: '8px' }}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Hardware;

// CSV automatic
// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';

// const Hardware = () => {
//   const [receivedData, setReceivedData] = useState(null);
//   const [motionAlert, setMotionAlert] = useState(false); // State for motion alert
//   const [processComplete, setProcessComplete] = useState({
//     process1: false,
//     process2: false,
//     process3: false,
//   }); // State to track process completion
//   const [defectStatus, setDefectStatus] = useState(null); // State for defect status
//   const [csvData, setCsvData] = useState([]);

//   // Automatically load CSV file on component mount
//   useEffect(() => {
//     fetch('/csv')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.text(); // Fetch the CSV file as text
//       })
//       .then(data => {
//         const parsedData = Papa.parse(data, { header: true }); // Parse CSV using PapaParse
//         setCsvData(parsedData.data); // Set the parsed data to state
//       })
//       .catch(error => console.error('Error fetching the CSV:', error));
//   }, []);

//   // WebSocket and other logic
//   useEffect(() => {
//     const ws = new WebSocket('ws://localhost:4000'); // Match this with your WebSocket server URL

//     ws.onopen = () => {
//       console.log('WebSocket connection established');
//     };

//     ws.onmessage = (event) => {
//       console.log('Received data from server:', event.data);

//       try {
//         const parsedData = JSON.parse(event.data);
//         setReceivedData(parsedData);

//         if (parsedData.motion_detection === 1) {
//           setMotionAlert(true);
//         } else {
//           setMotionAlert(false);
//         }
//       } catch (error) {
//         console.log('Failed to parse JSON:', event.data);
//       }
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const getProgressBarWidth = (counter) => {
//     switch (counter) {
//       case 0: return '0%';
//       case 1: return '33%';
//       case 2: return '66%';
//       case 3: return '100%';
//       default: return '0%';
//     }
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Hardware Data</h1>

//       {/* Motion Detection Alert */}
//       {motionAlert && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ffcccc', color: '#a00', border: '1px solid #a00', borderRadius: '5px' }}>
//           <strong>Alert:</strong> Motion detected!
//         </div>
//       )}

//       {/* Defect Status Notification */}
//       {defectStatus !== null && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: defectStatus === 1 ? '#ccffcc' : '#ffcccc', color: defectStatus === 1 ? '#080' : '#a00', border: `1px solid ${defectStatus === 1 ? '#080' : '#a00'}`, borderRadius: '5px' }}>
//           <strong>Notification:</strong> {defectStatus === 1 ? 'No defect detected!' : 'Warning: Defect detected!'}
//         </div>
//       )}

//       {/* Process Completion Notifications */}
//       {receivedData && processComplete.process1 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[0]} has been completed!
//         </div>
//       )}
//       {receivedData && processComplete.process2 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[1]} has been completed!
//         </div>
//       )}
//       {receivedData && processComplete.process3 && (
//         <div style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#ccffcc', color: '#080', border: '1px solid #080', borderRadius: '5px' }}>
//           <strong>Notification:</strong> Process for byproduct ID {receivedData.byproduct_ids[2]} has been completed!
//         </div>
//       )}

//       {/* Hardware Data Display */}
//       {receivedData ? (
//         <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Temperature:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.temperature} °C</p>
//           <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Humidity:</p>
//           <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.humidity} %</p>

//           {/* Progress Bars */}
//           {[0, 1, 2].map((index) => (
//             <div key={index}>
//               <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Byproduct ID: {receivedData.byproduct_ids[index]}</p>
//               <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
//                 <div
//                   style={{
//                     height: '100%',
//                     width: getProgressBarWidth(receivedData[`rfid_process_${index + 1}`]),
//                     backgroundColor: index === 0 ? '#76c7c0' : index === 1 ? '#ffa500' : '#ff6347',
//                     transition: 'width 0.5s ease-in-out'
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No data received yet...</p>
//       )}

//       {/* Display CSV Data */}
//       {csvData.length > 0 && (
//         <div style={{ marginTop: '20px', border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
//           <h2>CSV Data</h2>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 {Object.keys(csvData[0]).map((key) => (
//                   <th key={key} style={{ border: '1px solid #ccc', padding: '8px' }}>{key}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {csvData.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, idx) => (
//                     <td key={idx} style={{ border: '1px solid #ccc', padding: '8px' }}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Hardware;
