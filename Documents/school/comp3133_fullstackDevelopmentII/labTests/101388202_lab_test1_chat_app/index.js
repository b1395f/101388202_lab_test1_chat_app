const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const path = require('path');
//const signupRouter = require('./routes/signup.js');

const Schema = mongoose.Schema;

const SERVER_PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.static('views'))

const server = app.listen(SERVER_PORT, () => {
    console.log(`Server started at http://localhost:${SERVER_PORT}/`);
})

const DB_HOST = "cluster0.tgqhflm.mongodb.net"
const DB_USER = "dbUser"
const DB_PASSWORD = "dbUser"
const DB_NAME = "101388202_lab_test1_chat_app"
const DB_CONNECTION_STRING = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});

const serverIO = socketIO(server);


serverIO.on('connection', (socket) => {
    console.log('Socket connection made', socket.id);
    socket.emit('message', 'Hello from server');
    socket.on('message', (data) => {
        console.log(`Server : ${data}`);
    })

    socket.on('chat', (data) => {
        //serverIO.emit('new_chat_message', data);
        //console.log(JSON.stringify(serverIO.sockets));
        //serverIO.sockets.emit('new_chat_message', data);
        
        socket.broadcast.emit('new_chat_message', data);
        //socket.emit('new_chat_message', data);
        console.log(data);
    })

    socket.on('join_group', (groupName) => {
        socket.join(groupName);
        console.log(`Joined group ${groupName}`);
    })

    socket.on('group_chat', (data) => {
        serverIO.to(data.group_name).emit('new_group_message', data);
        console.log(data);
    })

    socket.on('leave_group', (groupName) => {
        socket.leave(groupName);
        console.log(`Left group ${groupName}`);
    })
    
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/chatscreen', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chatscreen.html'));
});

module.exports = app;