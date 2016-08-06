var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.Server(app),
    socketio = require("socket.io"),
    io = socketio(server);
app.use(express.static("pub"));

io.on('connection', (socket) => {
    console.log('Someone connected to server');

    socket.on('send', function(msg){
        io.emit('send', msg)
    });
    socket.on('like', function(like){
        var upvote = like+=1
        io.emit('like', upvote)
    })
    socket.on('dislike', function(like){
        var downvote = like-=1
        io.emit('dislike', downvote)
    })
    
    socket.on('disconnect', (socket) => {
       console.log('someone left the server'); 
    });
    
});
server.listen(80, () => {
    console.log('listening on port 80');
});