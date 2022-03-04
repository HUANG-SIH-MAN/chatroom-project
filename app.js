//後端伺服器 (express + socket設定)
const express = require("express"); 
const { createServer } = require("http"); 
const { Server } = require("socket.io"); 

const app = express(); 
const httpServer = createServer(app); 
const io = new Server(httpServer, { 
    cors: { 
        origin: '*',
        allowedHeaders: ['Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'],
        credentials: true 
    }
}); 

const socketServer = require('./server/socketServe')
const onConnection = (socket) => {
    socketServer(io, socket);
}
io.on("connection", onConnection)

httpServer.listen(3000);