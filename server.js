    const express = require('express');
    const http = require('http');
    const socketIo = require('socket.io');

    const app = express();
    const server = http.createServer(app);
    const io = socketIo(server);

    // Serve static files from the 'public' directory
    app.use(express.static('public'));

    // Handle a new connection
    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('diconnect', () => {
            console.log('User disconnected');
        });

        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
        });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
