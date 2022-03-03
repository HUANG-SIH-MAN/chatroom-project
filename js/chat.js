const socket = io("http://localhost:3000/");

// HTML畫面元件
const loginName = document.querySelector('#loginName')
const loginWrap = document.querySelector('.login-wrap')
const chatWrap = document.querySelector('.chat-wrap')
const chatTitle = document.querySelector('#chat-title')
const chatCon = document.querySelector('.chat-con')

// socket事件監聽
socket.on('loginSuccess', function(userName){
    loginWrap.remove()
    chatWrap.classList.remove('hide')
    alert(`${userName}成功登入`)
})

socket.on('loginFail', function(message){
    alert(message)
})

socket.on('addUser', function(message){
    chatTitle.innerHTML = `目前上線人數${message.userNumber}人`
    chatCon.innerHTML = `歡迎${message.message}`
})

// DOM事件操作
document.addEventListener('click', event => {
    const targe = event.target
    if (targe.matches('.login-btn')) {
        if (!loginName.value.trim()) alert('請輸入暱稱')
        socket.emit('login', loginName.value )

    }
})

