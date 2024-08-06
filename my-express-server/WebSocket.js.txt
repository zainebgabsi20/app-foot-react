// server.js

const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  // Send a message to the client every 5 seconds
  const interval = setInterval(() => {
    const data = {
      id: Math.random().toString(36).substring(7),
      is_live: true,
      time: {
        datetime: new Date().toISOString(),
      },
      teams: {
        home: { name: 'Team A', img: '/team-a.png' },
        away: { name: 'Team B', img: '/team-b.png' },
      },
      league: { id: '123', name: 'Sample League' },
    };
    socket.send(JSON.stringify(data));
  }, 5000);

  socket.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });

  socket.on('message', (message) => {
    console.log('Received message from client:', message);
  });
});

console.log('WebSocket server running on ws://localhost:8080');

