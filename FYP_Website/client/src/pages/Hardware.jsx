import React, { useState, useEffect } from 'react';

const Hardware = () => {
  const [receivedData, setReceivedData] = useState(null);

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

  const getProgressBarWidth = (rfid_process) => {
    switch (rfid_process) {
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
      {receivedData ? (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Temperature:</p>
          <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.temperature} °C</p>
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Humidity:</p>
          <p style={{ fontSize: '22px', margin: '5px 0' }}>{receivedData.humidity} %</p>

          {/* First Counter Progress Bar */}
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Process 1:</p>
          <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden', marginBottom: '10px' }}>
            <div
              style={{
                height: '100%',
                width: getProgressBarWidth(receivedData.rfid_process_1), // Access the first counter
                backgroundColor: '#76c7c0',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>

          {/* Second Counter Progress Bar */}
          <p style={{ fontSize: '18px', margin: '0', fontWeight: 'bold' }}>Process 2:</p>
          <div style={{ height: '30px', width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: getProgressBarWidth(receivedData.rfid_process_2), // Access the second counter
                backgroundColor: '#ffa500', // Change color for differentiation
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>
        </div>
      ) : (
        <p>No data received yet...</p>
      )}
    </div>
  );
};

export default Hardware;
