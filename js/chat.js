const socket = io("http://localhost:3000/");

let user = ''

// HTML畫面元件
const loginName = document.querySelector('#loginName')
const loginWrap = document.querySelector('#login-wrap')
const chatWrap = document.querySelector('.chat-wrap')
const chatTitle = document.querySelector('#chat-title')
const chatCon = document.querySelector('.chat-con')

// socket事件監聽
socket.on('loginSuccess', function(userName){
    user = userName  
    loginWrap.innerHTML = ``
    loginWrap.classList.remove('login-wrap')
    chatWrap.classList.remove('hide')
    alert(`${userName}成功登入`)
})

socket.on('loginFail', function(message){
    alert(message)
})

socket.on('addUser', function(message){
    chatTitle.innerHTML = `目前上線人數${message.userNumber}人`
    chatCon.innerHTML = `${message.message}`
})

socket.on('leave', function(message){
    chatTitle.innerHTML = `目前上線人數${message.userNumber}人`
    chatCon.innerHTML = `${message.message}`
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
        alert('成功登出!!')
    }
})

