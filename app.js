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

let userName = []

io.on("connection", (socket) => { 
    /*監聽登入事件*/
    socket.on('login', loginUserName => {
        // 檢查是否有重複登入
        const isNewPerson = userName.some(i => i === loginUserName)
        if (!isNewPerson) {
            //登入成功回應
            userName.push(loginUserName)
            socket.emit('loginSuccess', loginUserName)
            const message = {
                message: `歡迎${loginUserName}加入聊天室`,
                userNumber: userName.length
            }
            io.sockets.emit('addUser', message)
        } else {
            // 有重複登入，回傳失敗訊息
            socket.emit('loginFail', '暱稱已經有人使用過了')
        }
    })

    /*監聽登出事件*/
    socket.on('logout', logoutUserName => {
        userName = userName.filter(i => i !== logoutUserName)
        const message = {
            message: `${logoutUserName}離開聊天室`,
            userNumber: userName.length
        }
        io.sockets.emit('leave', message)
    })
}); 

httpServer.listen(3000);