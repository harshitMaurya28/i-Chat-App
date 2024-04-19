// This is node server which will handle the socket.io connections

const io = require('socket.io')(8880, {
    cors: {
      origin: 'http://127.0.0.1:5500', // Replace with your client's origin
      methods: ['GET', 'POST'],
    },
  });
  
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  
  console.log('Socket.IO server is running on port 8880');
  

const users = {};

io.on('connection', socket =>{    // ye io.on hai wo ek socket.io instance h jo ki bhut sare socket connections ko listen krega... maanlo bhut sare users aake jud rhe hn wo sb
    socket.on('new-user-joined', name=>{   // Jb bhi koi particular connection hoga to uske sath kya hona chahiye wo ye btyega
        //console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})