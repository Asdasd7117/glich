
const socket = io();
function login() {}
function register() {}
function searchUser() {}
function sendMessage() {
  const message = document.getElementById('messageInput').value;
  const receiver = document.getElementById('searchUser').value;
  fetch('/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, receiver }),
  });
  document.getElementById('messageInput').value = '';
}
function logout() {}
function sendImage() {}
socket.on('newMessage', (message) => {
  const chatContainer = document.getElementById('chatContainer');
  const newMessage = document.createElement('div');
  newMessage.textContent = `${message.sender}: ${message.message}`;
  chatContainer.appendChild(newMessage);
});
