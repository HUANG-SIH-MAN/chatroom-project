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

const userName = []

io.on("connection", (socket) => { 
    /*監聽登入事件*/
    socket.on('login', function(loginUserName){
        // 檢查是否有重複登入
        const isNewPerson = userName.some(i => i === loginUserName)
        if (!isNewPerson) {
            //登入成功回應
            userName.push(loginUserName)
            socket.emit('loginSuccess', loginUserName)
            const message = {
                message: `${loginUserName}加入聊天室`,
                userNumber: userName.length
            }
            io.sockets.emit('addUser', message)
        } else {
            // 有重複登入，回傳失敗訊息
            socket.emit('loginFail', '暱稱已經有人使用過了')
        }
    })
}); 

httpServer.listen(3000);