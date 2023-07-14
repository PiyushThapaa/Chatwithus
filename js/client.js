const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('text');
const messageSection = document.querySelector('.container');
const audio = new Audio('Ting.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageSection.innerHTML += `<div class="message left">You: ${messageInput.value}</div>`;
    socket.emit('send',messageInput.value);
    messageInput.value = '';
     audio.play();
});

const append = (message)=>{
    messageSection.innerHTML += `<div class="joining center"><ul><li>${message}</li></ul></div>`;
}

const name = prompt('Enter your name to join the chat');
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    append(`${name} joined the chat`)
});
socket.on('receive',data=>{
    messageSection.innerHTML += `<div class="message right">${data.name}: ${data.message}</div>`;
    audio.play();
});
socket.on('left',(name)=>{
    messageSection.innerHTML += `<div class="joinings center"><ul><li>${name} left the chat</li></ul></div>`;
});
