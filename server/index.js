const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
app.use(cors({
    origin: 'http://localhost:3000', // React app's URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true, // If you need to allow cookies or other credentials
}));

app.get('/', (req, res) => {
    try {
        res.json({
            status: true,
            message: "success"
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong!'
        })
    }
})

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // React app's URL
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true, // If you need to allow cookies or other credentials
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});