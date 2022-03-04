//資料庫設定
const { Message } = require('../../models')
const moment = require('moment')

let userName = []

module.exports = (io, socket) => {
    socket.on('login', loginUserName => {
        // 檢查是否有重複登入
        const isNewPerson = userName.some(i => i === loginUserName)
        if (!isNewPerson) {
            //登入成功回應
            userName.push(loginUserName)
            const message = {
                message: `歡迎${loginUserName}加入聊天室`,
                userNumber: userName.length
            }
            io.sockets.emit('addUser', message)
            Message.findAll({
                raw: true, nest: true,
                attributes: {
                    exclude: ['updatedAt']
                }
            })
            .then(data => {
                const messageData = data.map(i =>({
                    ...i,
                    createdAt: moment(i.createdAt).fromNow()
                }))
                return socket.emit('loginSuccess', {loginUserName, messageData})
            })
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

    /*接收訊息*/
    socket.on('sendMessage', data => {
        Message.create(data)
        .then(() => io.sockets.emit('receiveMessage', data)) 
    })
}