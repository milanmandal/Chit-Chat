const express = require('express');
const http = require('http');
const socketio = require('socket.io')
const app = express();
const {addUser, removeUser, getUser, getUsersInRoom} = require('./user')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const server = http.createServer(app);
const io = socketio(server);

const router = require('./router')
app.use(router);
app.use(cors());

//socket connection
io.on('connection', (socket) => { 
 
    //on() function to receive the event from the client along with the data name & room"
    socket.on('join', ({name,room}, callback)=>{

        console.log(name,room)
        //the addUser funtion will return only the error or user value
        const {error, user} = addUser({id: socket.id,name,room});//structure the id name and room paramaters from the addUser function

        if(error) return callback({error:error}); //callback is to send response to the client for this particular event
        console.log(user.name, user.room)
        socket.emit('message', {user: 'admin', text:`${user.name}, welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`})
        socket.join(user.room)
        //io.to(user.room).emit('members',{room:user.room, users: getUsersInRoom(user.room)})
        callback();
    });

    socket.on('sendMessage', (message,callback) =>{
        const user = getUser(socket.id)
        console.log(user,message)
        io.to(user?.room).emit('message', {user: user?.name, text: message})
        callback()
    })

    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id)
        console.log("check removed",user)
        if(user){
            io.to(user?.room).emit('message',{user:'admin',text:`${user?.name} has left`})
            //io.to(user.room).emit('members',{room:user.room, users: getUsersInRoom(user.room)})// update the state of the list after new user enters.
            console.log(user.name,'User left');
        }
    })
});



server.listen(PORT, () => console.log(`Server has started on port ${5000}`));

//using require when a module is exported.
//using import when a file or library if exported