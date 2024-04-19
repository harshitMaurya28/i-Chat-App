const socket = io('http://localhost:8880');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('ting.mp3');


const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault(); //Isse page baar baar reload nhi hoga
    const message = messageInput.value;
    append(`<strong>You:</strong> ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt("Enter your name to join in chat");

socket.emit('new-user-joined', name); 

socket.on('user-joined', name =>{
    append(`<strong>${name} joined the chat</strong>`, 'right');
})

socket.on('receive', data =>{
    append(`<strong>${data.name}:</strong> ${data.message}`, 
    'left');
})

socket.on('left', name =>{
    append(`<strong>${name} left the chat</strong>`,'left');
})
