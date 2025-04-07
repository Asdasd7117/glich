
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb+srv://Asdasd7117:Asdasd7117@cluster0.affy7cw.mongodb.net/chatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static('public'));
app.use(express.json());

let currentUser = null;

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  await newUser.save();
  res.status(200).send('تم إنشاء الحساب');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    currentUser = user;
    res.status(200).send('تم تسجيل الدخول');
  } else {
    res.status(400).send('خطأ في البيانات');
  }
});

app.post('/sendMessage', async (req, res) => {
  const { message, receiver } = req.body;
  const newMessage = new Message({ sender: currentUser.username, receiver, message });
  await newMessage.save();
  io.emit('newMessage', newMessage);
  res.status(200).send('تم إرسال الرسالة');
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
