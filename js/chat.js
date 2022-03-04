//前端版面的JS
const socket = io("http://localhost:3000/"); //填寫要連接後端是伺服器網址

let user = '' //當前使用者名稱

// HTML畫面元件
const loginName = document.querySelector('#loginName')
const loginWrap = document.querySelector('#login-wrap')
const chatWrap = document.querySelector('.chat-wrap')
const chatTitle = document.querySelector('#chat-title')
const chatCon = document.querySelector('.chat-con')
const sendtxt = document.querySelector('#sendtxt')

// socket事件監聽
//登入成功
socket.on('loginSuccess', data => {
    user = data.loginUserName  
    loginWrap.innerHTML = ``
    loginWrap.classList.remove('login-wrap')
    chatWrap.classList.remove('hide')
    data.messageData.forEach(i => {
        if (user === i.user) {
            chatCon.innerHTML +=  `
                <div class="chat-item item-right clearfix">
                    <span class="abs uname">${i.user}</span>
                    <span class="message fr">${i.message}</span>
                    <span class="time-right">${i.createdAt}</span>
                </div>
            `
        } else {
            chatCon.innerHTML +=  `
                <div class="chat-item item-left clearfix rela">
                    <span class="abs uname">${i.user}</span>
                    <span class="fl message">${i.message}</span>
                    <span class="time-left">${i.createdAt}</span>
                </div>
            `
        }
    });
    alert(`${user}成功登入`)
})

//登入失敗
socket.on('loginFail', message => {
    alert(message)
})

//取得有人加入
socket.on('addUser', message => {
    chatTitle.innerHTML = `目前上線人數${message.userNumber}人`
    chatCon.innerHTML += `<div>${message.message}</div>`
})

//取得是否有人離開
socket.on('leave', message => {
    chatTitle.innerHTML = `目前上線人數${message.userNumber}人`
    chatCon.innerHTML += `<div>${message.message}</div>`
})

//取得訊息
socket.on('receiveMessage', data => {
    if (user === data.user) {
        chatCon.innerHTML +=  `
            <div class="chat-item item-right clearfix">
                <span class="abs uname">${data.user}</span>
                <span class="message fr">${data.message}</span>
            </div>
        `
    } else {
        chatCon.innerHTML +=  `
            <div class="chat-item item-left clearfix rela">
                <span class="abs uname">${data.user}</span>
                <span class="fl message">${data.message}</span>
            </div>
        `
    }
})

socket.on("disconnect", (reason) => {
    console.log(reason)
})

// DOM事件操作
document.addEventListener('click', event => {
    const targe = event.target
    //登入
    if (targe.matches('.login-btn')) {
        if (!loginName.value.trim()) {
            alert('請輸入暱稱')
        } else {
            socket.emit('login', loginName.value.trim() )  
        }
    }
    //登出
    if (targe.matches('.leaveBtn')) {
        socket.emit('logout', user )
        user = ''
        loginWrap.innerHTML = `
            <div class="login-con">
                <p>🍇</p>
                <span>Choose a great name</span>
                <input type="text" placeholder="Grape" id="loginName">
                <button class="login-btn">Start</button>
            </div>
        `
        loginWrap.classList.add('login-wrap')
        chatWrap.classList.add('hide')
        chatCon.innerHTML = ''
        alert('成功登出!!')
    }
    //發送訊息
    if (targe.matches('.sendBtn') && sendtxt.value.trim()) {
        socket.emit('sendMessage', { user, message:  sendtxt.value.trim() })
        sendtxt.value = ''
    }
})

